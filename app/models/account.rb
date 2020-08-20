# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#   id                                :integer          not null, primary key
#   email                             :string
#   encrypted_password                :string
#   reset_password_token              :string
#   reset_password_sent_at            :datetime
#   remember_created_at               :datetime
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   code                              :string           auto create
#   joining_date                      :date             not null
#   official_date                     :date
#   contract_type                     :string
#   position                          :string
#   status                            :boolean          default true
#   id_card                           :string           not null
#   profile_id                        :integer          not null, foreign key

class Account < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :secure_validatable

  has_many :timesheets, dependent: :destroy
  has_many :providers, dependent: :destroy
  has_one :profile, dependent: :destroy
  has_many :overtimes, dependent: :destroy
  has_many :dayoffs, dependent: :destroy
  has_many :compensations, dependent: :destroy
  has_many :timesheet_requests, dependent: :destroy

  # add jwt ID
  before_create :add_jti

  before_save :clean_data
  after_create :create_code

  validates :id_card, presence: true, length: { minimum: 9, maximum: 12 },
                      uniqueness: { case_sensitive: false }
  validates :joining_date, :position, presence: true
  validates :email, presence: true,
                    length: { maximum: 100 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :code, uniqueness: { case_sensitive: false }
  validate :validate_date
  validate :roles_valid

  attr_accessor :skip_validate_date
  attr_accessor :input_roles

  accepts_nested_attributes_for :profile, allow_destroy: true
  accepts_nested_attributes_for :roles, allow_destroy: true

  scope :by_email, ->(email) { where("email LIKE ? ", "%#{email}%")}
  scope :by_name, ->(name) {joins(:profile).where("profiles.name = ?", name)}

  def is_admin?
    has_role? :admin
  end

  def provider_options
    providers.map do |provider|
      provider_name = if provider.chatwork?
                        provider.type_id + ": " + provider.info["email"]
                      else
                        provider.type_id + ": " + provider.info["nickname"] + " - " + provider.info["team"]
                      end
      [
        provider_name,
        provider.id
      ]
    end
  end

  def chatwork_connected?
    providers.any?(&:chatwork?)
  end

  def slack_connected?
    providers.any?(&:slack?)
  end

  def chatwork_providers
    providers.chatwork
  end

  def slack_providers
    providers.slack
  end

  def self.get_admin_emails
    Account.with_role(:admin).pluck(:email)
  end

  def password_match?
    self.errors[:password] << I18n.t("errors.messages.blank") if password.blank?
    self.errors[:password_confirmation] << I18n.t("errors.messages.blank") if password_confirmation.blank?
    if password != password_confirmation
      self.errors[:password_confirmation] << I18n.translate("errors.messages.confirmation", attribute: "password")
    end
    password == password_confirmation && password.present?
  end

  def attempt_set_password params
    p = {}
    p[:password] = params[:password]
    p[:password_confirmation] = params[:password_confirmation]
    update_attributes(p)
  end

  def has_no_password?
    self.encrypted_password.blank?
  end

  def only_if_unconfirmed
    pending_any_confirmation {yield}
  end

  private

  #add jwt ID
  def add_jti
    self.jti ||= SecureRandom.uuid
  end

  def clean_data
    self.contract_type = contract_type.downcase if contract_type.present?
    self.position = position.downcase
  end

  def create_code
    code = "B%06d" % id
    self.update_attributes(code: code)
  end

  def valid_joining_date
    if joining_date.present? && joining_date < Date.today
      errors.add(:joining_date, "must greater than or equal to current date")
    end
  end

  def valid_official_date
    if joining_date.present? && official_date.present? && official_date < joining_date
      errors.add(:official_date, "must greater than or equal to joining date")
    end
  end

  def validate_date
    unless skip_validate_date
      valid_joining_date if joining_date_changed?
      valid_official_date
    end
  end

  def roles_valid
    if input_roles.present?
      if input_roles.include?("admin")
        errors.add(:role_admin, ":chỉ được tồn tại duy nhất") if input_roles.length() != 1
      else
        errors.add(:role_staff, "phải tồn tại") if !input_roles.include?("staff")
      end
      self.roles = []
      input_roles.each do |role|
        errors.add(:role_name, "không đúng định dạng") if !ROLE.include?(role)
        self.add_role(role)
      end
      errors.add(:role_admin, "còn duy nhất một taì khoản là admin") if Account.with_role(:admin).blank?
    end
  end
end

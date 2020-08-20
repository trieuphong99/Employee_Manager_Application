# frozen_string_literal: true

# == Schema Information
#
# Table name: compensations
#
#   id                                :integer          not null, primary key
#   name                              :string
#   phone_number                      :string
#   address                           :string
#   sex                               :string
#   date_of_birth                     :date
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   account_id                        :integer          not null, foreign key

class Profile < ApplicationRecord
  belongs_to :account

  before_save :clean_data

  validates :name, presence: true, length: { minimum: 4, maximum: 30 }
  validates :phone_number, presence: true, length: { minimum: 10, maximum: 11 },
                           uniqueness: { case_sensitive: false },
                           format: { with: VALID_PHONE_REGEX }
  validates :address, length: { maximum: 100 }
  validates :sex,
            :date_of_birth, presence: true
  validate :valid_sex
  validate :valid_date_of_birth

  private

  def valid_sex
    errors.add(:sex, "format not right") if sex.present? && !SEX.include?(sex.downcase)
  end

  def clean_data
    self.name = name.strip.downcase
    self.sex = sex.downcase
    self.address = address.strip.downcase if address.present?
    self.phone_number = phone_number.strip
  end

  def valid_date_of_birth
    errors.add(:date_of_birth, "must less than current date") if date_of_birth.present? && date_of_birth > Date.today
  end
end

# frozen_string_literal: true

# == Schema Information
#
# Table name: compensations
#
#   id                                :integer          not null, primary key
#   date                              :date             not null
#   for_date                          :string           not null
#   start_at                          :time
#   end_at                            :time
#   comfirmation_status               :string           default waiting
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   account_id                        :integer          not null, foreign key

class Compensation < ApplicationRecord
  belongs_to :account

  validates :date,
            :for_date, presence: true
  validate :valid_for_date
  validate :valid_date
  validates :date,
    uniqueness: { conditions: -> { where.not(confirmation_status: %w(rejected failed)) } }
  validates :for_date,
    uniqueness: { conditions: -> { where.not(confirmation_status: %w(rejected failed)) } }
  before_save :clean_data
  scope :daterange, ->(from_date, to_date) { where("date >= ? AND date <= ?", from_date, to_date) }
  scope :by_user_id, ->(id) {where("account_id = ?", id)}
  scope :by_for_date, ->(for_date) {where("for_date = ? ", for_date).order(id: :desc)}
  scope :by_date, ->(date) {where("date = ? ", date).order(id: :desc)}

  enum confirmation_status: { waiting: "waiting", doing: "doing", rejected: "rejected", success: "success", failed: "failed"}

  private

  def valid_for_date
    if for_date.present? && date.present? && for_date >= date
      # errors.add(:for_date, "can't be set for the following days")
      errors.add(:for_date, "phải nhỏ hơn date")
    end
  end

  def valid_date
    if self.date.present?
      if self.date > Date.today
        # errors.add(:date, "Status cannot be success with date greater than current day") if self.success?
        errors.add(:date, "Status không thể thay đổi thành success với date lớn hơn ngày hiện tại") if self.success?
      else
        # errors.add(:date, "Status cannot be doing with date less than current day") if self.doing?
        errors.add(:date, "Status không thể thay đổi thành doing với date nhỏ hơn ngày hiện tại") if self.doing?
      end
    end
  end

  def clean_data
    self.confirmation_status = confirmation_status.downcase
  end
end

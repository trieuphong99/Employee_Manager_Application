# frozen_string_literal: true

# == Schema Information
#
# Table name: overtimes
#
#   id                                :integer          not null, primary key
#   date                              :date             not null
#   start_at                          :time             not null
#   end_at                            :time             not null
#   reason                            :string           not null
#   comfirmation_status               :string           default waiting
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   account_id                        :integer          not null, foreign key

class Overtime < ApplicationRecord
  belongs_to :account

  before_save :clean_data

  validates :date,
            :start_at,
            :end_at, presence: true
  validates :reason, presence: true, length: {maximum: 1000}
  validate :valid_end_at

  enum confirmation_status: { waiting: "waiting", confirmed: "confirmed", rejected: "rejected"}
  scope :daterange, ->(from_date, to_date) { where("date >= ? AND date <= ?", from_date, to_date) }
  scope :register_day, ->(date) {where("date = ?", date)}
  scope :by_user_id, ->(id) {where("account_id = ?", id)}

  private

  def valid_end_at
    errors.add(:end_at, "must greater than start time") if end_at.present? && start_at.present? && end_at <= start_at
  end

  def clean_data
    self.reason = reason.strip
    self.confirmation_status = confirmation_status.downcase
  end
end

# frozen_string_literal: true

# == Schema Information
#
# Table name: timesheet_requests
#
#   id                                :integer          not null, primary key
#   date                              :date             not null
#   start_at                          :time             not null
#   end_at                            :time
#   reason                            :string
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   account_id                        :integer          not null, foreign key
#   reason_in                         :string           
#   reason_out                        :string

class TimesheetRequest < ApplicationRecord
  belongs_to :account

  validates :date,
            :start_at, presence: true
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
    self.reason_in = reason_in.strip if reason_in.present?
    self.reason_out = reason_out.strip if reason_out.present?
    self.reason = reason.strip if reason.present?
    self.confirmation_status = confirmation_status.downcase
  end
end

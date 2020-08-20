# frozen_string_literal: true

# == Schema Information
#
# Table name: timesheets
#
#   id                                :integer          not null, primary key
#   date                              :date             not null
#   start_at                          :time             not null
#   end_at                            :time
#   note                              :text
#   report_content                    :text
#   report_room                       :string
#   reason                            :string
#   status                            :string           default 'work'
#   is_allowed                        :boolean          default true
#   is_paid                           :boolean          default true
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   account_id                        :integer          not null, foreign key
#   provider_id                       :integer          not null, foreign key
#   request_approving                 :string           default "Confirmed"
#   reason_in                         :string           
#   reason_out                        :string

class Timesheet < ApplicationRecord
  belongs_to :account
  belongs_to :provider, optional: true

  before_save :clean_data, :change_timesheet_status

  validates :provider_id, :report_content, presence: true, if: :is_finish
  validates :date, presence: true
  validates :reason_in, length: {maximum: 200}
  validates :reason_out, presence: true, length: {maximum: 200}, if: :is_leave_early
  validate :valid_status

  attr_accessor :is_finish, :is_leave_early

  scope :today, -> { where(date: Date.today) }
  scope :yesterday, -> { where(date: Date.yesterday) }
  scope :in_month, ->(date) { where("date >= ? and date <= ?", date.at_beginning_of_month, date.at_end_of_month) }
  scope :daterange, ->(from_date, to_date) { where("date >= ? and date <= ?", from_date, to_date) }
  scope :in_late, -> {where("cast(start_at as time) > ?", START_TIME)}
  scope :leave_early, -> {where("cast(end_at as time) < ?", END_TIME)}
  scope :half_dayoff, -> { where(status: "half day-off")}
  scope :work, -> { where("status in ('work', 'half day-off')")}
  scope :in_late_and_leave_early, -> {
                                    where("cast(start_at as time) > ?
                                          and cast(end_at as time) < ?",
                                          START_TIME, END_TIME)
                                  }
  scope :full_day_off_has_allowed_and_paid, -> {
                                              where("status = ? and is_allowed = ? and is_paid = ?",
                                                    "full day-off", true, true)
                                            }
  scope :full_day_off_has_allowed_not_paid, -> {
                                              where("status = ? and is_allowed = ? and is_paid = ?",
                                                    "full day-off", true, false)
                                            }
  scope :full_day_off_not_allowed, -> {where("status = ? and is_allowed = ?", "full day-off", false)}
  scope :half_day_off_has_allowed_and_paid, -> {
                                              where("status = ? and is_allowed = ? and is_paid = ?",
                                                    "half day-off", true, true)
                                            }
  scope :half_day_off_has_allowed_not_paid, -> {
                                              where("status = ? and is_allowed = ? and is_paid = ?",
                                                    "half day-off", true, false)
                                            }
  scope :half_day_off_not_allowed, -> {where("status = ? and is_allowed = ?", "half day-off", false)}

  def working_hour
    timesheet_sp.working_hour
  end

  def working_start
    timesheet_sp.working_start
  end

  def off_hour
    WORK_TIME.to_f > working_hour ? WORK_TIME.to_f - working_hour : 0
  end

  def odd_hour
    return 0 if end_at.nil?

    WORK_TIME.to_f < working_hour ? working_hour - WORK_TIME.to_f : 0
  end

  private

  def clean_data
    self.status = status.downcase
    self.note = note.strip if note.present?
    self.reason = reason.strip if reason.present?
  end

  def valid_status
    errors.add(:status, "format not right") if status.present? && !WORK_STATUS.include?(status)
  end

  def change_timesheet_status
    self.status = "half day-off" if timesheet_sp.is_half_dayoff
  end

  def timesheet_sp
    TimesService.new(date, start_at, end_at, status)
  end
end

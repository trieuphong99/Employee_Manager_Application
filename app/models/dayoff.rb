# frozen_string_literal: true

# == Schema Information
#
# Table name: dayoffs
#
#   id                                :integer          not null, primary key
#   request_date                      :date             not null
#   from_date                         :date             not null
#   to_date                           :date             not null
#   reason                            :string           not null
#   status                            :string           not null
#   confirmation_status               :boolean          default false
#   is_paid                           :boolean          default false
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   account_id                        :integer          not null, foreign key

class Dayoff < ApplicationRecord
  belongs_to :account

  before_save :clean_data, :valid_status_daterange

  validates :request_date, presence: true
  validates :from_date, presence: true
  validates :to_date, presence: true
  validates :status, presence: true
  validates :reason, presence: true, length: { maximum: 200 }
  validate :valid_status
  validate :valid_to_date
  validate :valid_date_range

  scope :in_date, ->(date) {
                    where("(status = 'full day-off' and from_date = ?) or
                           (status = 'long day-off' and from_date <= ? and to_date >= ?)",
                            date, date, date)
                  }
  scope :daterange, ->(from_date, to_date) {
                      where("(from_date >= ? and from_date <= ?) or
                             (to_date >= ? and to_date <= ?)",
                              from_date, to_date, from_date, to_date)
                    }
  scope :by_user_id, ->(id) {where("account_id = ?", id)}
  enum confirmation_status: { waiting: "waiting", confirmed: "confirmed", rejected: "rejected"}

  private

  def valid_status
    errors.add(:status, "format not right") if status.present? && !DAYOFF_STATUS.include?(status.downcase)
  end

  def clean_data
    self.status = status.downcase
    self.reason = reason.strip
    self.confirmation_status = confirmation_status.downcase
  end

  def valid_to_date
    if to_date.present? && from_date.present? && to_date < from_date
      errors.add(:to_date, "must greater than or equal to from date")
    end
  end

  def valid_date_range
    if Dayoff.where(id: id).exists?
      if Dayoff.where(from_date: from_date).blank? || Dayoff.where(to_date: to_date).blank?
        overlapped_daterange = Dayoff.where("? <= to_date AND from_date <= ?",
          from_date, to_date).where.not(id: id)
        errors.add(:date, "range is invalid") if overlapped_daterange.present?
      elsif will_save_change_to_from_date? || will_save_change_to_to_date?
        errors.add(:date, "range is invalid")
      end
    else
      if Dayoff.where(from_date: from_date).blank? && Dayoff.where(to_date: to_date).blank?
        overlapped_daterange = Dayoff.where("? <= to_date AND from_date <= ?",
          from_date, to_date).where.not(id: id)
        errors.add(:date, "range is invalid") if overlapped_daterange.present?
      else
        errors.add(:date, "range is invalid")
      end
    end
  end

  def valid_status_daterange
    if to_date.present? && from_date.present? && status.present?
      errors.add(:status, "not match with long day-off") if to_date - from_date > 0 && status != "Long Day-off"
      errors.add(:status, "not match with one day-off") if to_date - from_date == 0 && status == "Long Day-off"
    end
  end
end

# frozen_string_literal: true

class Project < ApplicationRecord
  belongs_to :customer
  has_many :invoices, dependent: :destroy

  validates :name, :start_date, :end_date, presence: true
  validate :end_date_greater_start_date

  # after_save :create_invoice

  def create_invoice
    return unless (saved_changes.keys & %w(invoice_type amount start_date end_date currency)).any?

    Project.transaction do
      Invoice.where(project_id: id).delete_all
      invoice_details.each do |invoice|
        Invoice.create(invoice)
      end
    end
  end

  def invoice_details
    if one_time?
      [
        {
          amount: amount,
          invoice_date: end_date,
          payment_date: end_date + 30.days,
          project_id: id,
          currency: currency
        }
      ]
    else
      result = []
      date = start_date
      while date < end_date
        result << {
          amount: amount,
          invoice_date: date.end_of_month,
          payment_date: (date.end_of_month + 1.day).end_of_month,
          project_id: id,
          currency: currency
        }
        date = date.end_of_month + 1.day
      end
      result
    end
  end

  private

  def end_date_greater_start_date
    return unless end_date && start_date

    errors.add(:end_date, "End date must be greater then Start date") if end_date <= start_date
  end
end

# frozen_string_literal: true

class InvoiceItem < ApplicationRecord
  belongs_to :invoice

  validates :name, :quantity, :unit, :price_unit, :total, :currency, presence: true
  validates :quantity, numericality: { less_than: 100 }
  validates :price_unit, numericality: { less_than: 1_000_000_000 }

  enum unit: { man_month: 0 }
  enum currency: { VND: 0, USD: 1, JPY: 2 }

  before_validation :calculate_total

  private

  def calculate_total
    return unless quantity && price_unit

    self.total = quantity * price_unit
  end
end

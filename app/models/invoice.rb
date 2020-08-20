# frozen_string_literal: true

class Invoice < ApplicationRecord
  belongs_to :project
  has_many :invoice_items, dependent: :destroy

  validates :amount, :currency, :invoice_date, :payment_date, presence: true

  enum currency: { VND: 0, USD: 1, JPY: 2 }
  enum state: { initial: 0, invoice_exported: 1, deposit: 2 }

  accepts_nested_attributes_for :invoice_items

  before_validation :calculate_amount

  def export_expired?
    initial? && Date.today > invoice_date
  end

  def deposit_expired?
    !deposit? && Date.today > payment_date
  end

  def invoice_exported!
    self.state = :invoice_exported
    save
  end

  def deposit!
    self.state = :deposit
    save
  end

  private

  def calculate_amount
    self.amount = invoice_items.map do |item|
      item.price_unit * item.quantity if item.price_unit && item.quantity
    end.compact.sum
    self.currency = invoice_items.map(&:currency).compact.first
  end
end

# frozen_string_literal: true

class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.integer :project_id
      t.decimal :amount, precision: 15, scale: 2
      t.integer :currency, default: 1
      t.date :invoice_date
      t.date :payment_date

      t.timestamps
    end
  end
end

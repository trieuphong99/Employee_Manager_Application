# frozen_string_literal: true

class CreateInvoiceItems < ActiveRecord::Migration[5.2]
  def change
    create_table :invoice_items do |t|
      t.integer :invoice_id
      t.string :name
      t.decimal :quantity, precision: 15, scale: 2
      t.integer :unit, default: 0
      t.decimal :price_unit, precision: 15, scale: 2
      t.decimal :total, precision: 15, scale: 2
      t.integer :currency, default: 1

      t.timestamps
    end
  end
end

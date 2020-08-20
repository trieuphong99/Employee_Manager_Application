# frozen_string_literal: true

class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.integer :customer_id
      t.string :name
      t.date :start_date
      t.date :end_date
      t.integer :invoice_type
      t.decimal :amount, precision: 15, scale: 2
      t.integer :currency, default: 1

      t.timestamps
    end
  end
end

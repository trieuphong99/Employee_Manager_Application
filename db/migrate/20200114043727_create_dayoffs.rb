# frozen_string_literal: true

class CreateDayoffs < ActiveRecord::Migration[5.2]
  def change
    create_table :dayoffs do |t|
      t.date :date
      t.string :reason
      t.string :status
      t.boolean :is_allowed, default: false
      t.boolean :is_paid, default: false
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end

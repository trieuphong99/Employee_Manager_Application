# frozen_string_literal: true

class CreateOvertimes < ActiveRecord::Migration[5.2]
  def change
    create_table :overtimes do |t|
      t.date :date
      t.time :start_at
      t.time :end_at
      t.boolean :is_allowed, default: false
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end

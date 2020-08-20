# frozen_string_literal: true

class CreateCompensations < ActiveRecord::Migration[5.2]
  def change
    create_table :compensations do |t|
      t.date :date
      t.string :for_date
      t.time :start_at
      t.time :end_at
      t.boolean :is_allowed
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end

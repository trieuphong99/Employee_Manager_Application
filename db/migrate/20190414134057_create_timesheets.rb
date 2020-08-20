# frozen_string_literal: true

class CreateTimesheets < ActiveRecord::Migration[5.2]
  def change
    create_table :timesheets do |t|
      t.date :date
      t.datetime :start_at
      t.datetime :end_at
      t.text :note
      t.integer :account_id

      t.timestamps
    end

    add_index :timesheets, :account_id
    add_index :timesheets, :date
    add_index :timesheets, %i[account_id date]
  end
end

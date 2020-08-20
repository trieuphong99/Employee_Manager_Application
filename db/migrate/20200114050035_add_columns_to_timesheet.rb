# frozen_string_literal: true

class AddColumnsToTimesheet < ActiveRecord::Migration[5.2]
  def change
    add_column :timesheets, :reason, :string
    add_column :timesheets, :status, :string, default: 'work'
    add_column :timesheets, :is_allowed, :boolean, default: true
    add_column :timesheets, :is_paid, :boolean, default: true
  end
end

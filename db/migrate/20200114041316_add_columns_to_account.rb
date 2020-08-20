# frozen_string_literal: true

class AddColumnsToAccount < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :joining_date, :date
    add_column :accounts, :official_date, :date
    add_column :accounts, :contract_type, :string
    add_column :accounts, :position, :string
    add_column :accounts, :status, :boolean, default: true
  end
end

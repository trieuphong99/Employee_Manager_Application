# frozen_string_literal: true

class AddCodeToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :code, :string
  end
end

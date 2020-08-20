# frozen_string_literal: true

class CreateBackAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :back_accounts do |t|
      t.string :bank_name
      t.string :branch
      t.string :swift_code
      t.string :account_number
      t.string :account_name

      t.timestamps
    end
  end
end

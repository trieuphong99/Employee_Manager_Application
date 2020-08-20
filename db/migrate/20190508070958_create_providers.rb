# frozen_string_literal: true

class CreateProviders < ActiveRecord::Migration[5.2]
  def change
    create_table :providers do |t|
      t.integer :uid
      t.integer :type_id
      t.text :credentials
      t.text :info
      t.string :rooms
      t.integer :account_id

      t.timestamps
    end
  end
end

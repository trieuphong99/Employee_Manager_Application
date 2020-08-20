# frozen_string_literal: true

class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.string :name
      t.string :phone_number
      t.string :address
      t.string :sex
      t.date :date_of_birth
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end

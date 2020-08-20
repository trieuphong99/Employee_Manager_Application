class AddIndexToProfilePhoneNumber < ActiveRecord::Migration[5.2]
  def change
    add_index :profiles, :phone_number, unique: true
  end
end

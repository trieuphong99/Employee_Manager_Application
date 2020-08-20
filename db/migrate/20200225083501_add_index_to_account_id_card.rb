class AddIndexToAccountIdCard < ActiveRecord::Migration[5.2]
  def change
    add_index :accounts, :id_card, unique: true
  end
end

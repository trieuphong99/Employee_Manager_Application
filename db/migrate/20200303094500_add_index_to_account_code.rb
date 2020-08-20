class AddIndexToAccountCode < ActiveRecord::Migration[5.2]
  def change
    add_index :accounts, :code, unique: true
  end
end

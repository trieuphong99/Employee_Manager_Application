class AddJtiToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :jti, :string
    # populate jti so we can make it not nullable
    Account.all.each do |account|
      account.update_column(:jti, SecureRandom.uuid)
    end
    change_column_null :accounts, :jti, false
    add_index :accounts, :jti, unique: true
  end
end

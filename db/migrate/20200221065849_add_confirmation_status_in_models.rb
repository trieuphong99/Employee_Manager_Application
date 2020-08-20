class AddConfirmationStatusInModels < ActiveRecord::Migration[5.2]
  def change
    add_column :dayoffs, :confirmation_status, :string, default: "waiting"
    add_column :compensations, :confirmation_status, :string, default: "waiting"
    add_column :overtimes, :confirmation_status, :string, default: "waiting"
  end
end

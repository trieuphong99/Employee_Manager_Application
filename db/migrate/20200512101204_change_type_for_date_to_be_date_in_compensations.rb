class ChangeTypeForDateToBeDateInCompensations < ActiveRecord::Migration[5.2]
  def change
    remove_column :compensations, :for_date, :string
    add_column :compensations, :for_date, :date
  end
end

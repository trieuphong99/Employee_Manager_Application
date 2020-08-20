class ChangeDefaultCompensation < ActiveRecord::Migration[5.2]
  def change
    change_column :compensations, :is_allowed, :boolean, :default => false
  end
end

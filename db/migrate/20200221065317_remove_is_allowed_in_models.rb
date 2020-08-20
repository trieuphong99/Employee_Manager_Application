class RemoveIsAllowedInModels < ActiveRecord::Migration[5.2]
  def change
    remove_column :dayoffs, :is_allowed, :boolean
    remove_column :compensations, :is_allowed, :boolean
    remove_column :overtimes, :is_allowed, :boolean
  end
end

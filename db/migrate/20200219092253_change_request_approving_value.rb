class ChangeRequestApprovingValue < ActiveRecord::Migration[5.2]
  def change
    remove_column :timesheets, :request_approving
    add_column :timesheets, :request_approving, :boolean, default: true
  end
end

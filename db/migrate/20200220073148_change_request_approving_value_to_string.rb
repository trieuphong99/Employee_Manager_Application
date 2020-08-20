class ChangeRequestApprovingValueToString < ActiveRecord::Migration[5.2]
  def change
    change_column :timesheets, :request_approving, :string
  end
end

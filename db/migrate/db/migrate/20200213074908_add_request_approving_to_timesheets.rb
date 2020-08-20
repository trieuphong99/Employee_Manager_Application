class AddRequestApprovingToTimesheets < ActiveRecord::Migration[5.2]
  def change
    add_column :timesheets, :request_approving, :string
  end
end

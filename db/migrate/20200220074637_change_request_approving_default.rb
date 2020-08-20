class ChangeRequestApprovingDefault < ActiveRecord::Migration[5.2]
  def change
    change_column :timesheets, :request_approving, :string, default: "Confirmed"
  end
end

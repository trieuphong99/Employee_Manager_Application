class AddAccountToTimesheetRequest < ActiveRecord::Migration[5.2]
  def change
    add_reference :timesheet_requests, :account, foreign_key: true
  end
end

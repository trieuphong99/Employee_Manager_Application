class AddReasonToTimesheetRequest < ActiveRecord::Migration[5.2]
  def change
    add_column :timesheet_requests, :reason, :string
  end
end

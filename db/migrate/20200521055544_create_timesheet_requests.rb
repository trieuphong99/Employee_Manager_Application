class CreateTimesheetRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :timesheet_requests do |t|
      t.date :date
      t.datetime :start_at
      t.datetime :end_at
      t.string :reason_in
      t.string :reason_out
      t.string :confirmation_status, default: "waiting"

      t.timestamps
    end
  end
end

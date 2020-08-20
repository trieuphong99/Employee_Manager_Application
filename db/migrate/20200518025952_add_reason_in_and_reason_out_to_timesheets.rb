class AddReasonInAndReasonOutToTimesheets < ActiveRecord::Migration[5.2]
  def change
    add_column :timesheets, :reason_in, :string
    add_column :timesheets, :reason_out, :string
  end
end

# frozen_string_literal: true

class AddReportToTimesheet < ActiveRecord::Migration[5.2]
  def change
    add_column :timesheets, :report_content, :text
    add_column :timesheets, :provider_type, :integer
    add_column :timesheets, :report_room, :string
  end
end

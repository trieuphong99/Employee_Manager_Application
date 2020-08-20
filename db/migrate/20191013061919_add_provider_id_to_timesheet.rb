# frozen_string_literal: true

class AddProviderIdToTimesheet < ActiveRecord::Migration[5.2]
  def change
    add_column :timesheets, :provider_id, :integer
    remove_column :timesheets, :provider_type
  end
end

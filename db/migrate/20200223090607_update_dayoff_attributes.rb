class UpdateDayoffAttributes < ActiveRecord::Migration[5.2]
  def change
    remove_column :dayoffs, :date, :date
    add_column :dayoffs, :request_date, :date
    add_column :dayoffs, :from_date, :date
    add_column :dayoffs, :to_date, :date
  end
end

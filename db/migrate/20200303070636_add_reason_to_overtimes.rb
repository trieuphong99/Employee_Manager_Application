class AddReasonToOvertimes < ActiveRecord::Migration[5.2]
  def change
    add_column :overtimes, :reason, :string
  end
end

# frozen_string_literal: true

class AddStateToInvoice < ActiveRecord::Migration[5.2]
  def change
    add_column :invoices, :state, :integer, default: 0
  end
end

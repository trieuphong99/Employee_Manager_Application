# frozen_string_literal: true

class AddCardToAccount < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :id_card, :string
  end
end

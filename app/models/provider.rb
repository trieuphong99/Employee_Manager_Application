# frozen_string_literal: true

class Provider < ApplicationRecord
  serialize :rooms, Array
  serialize :credentials, Hash
  serialize :info, Hash

  enum type_id: { chatwork: 1, slack: 2 }

  belongs_to :account

  scope :by_type_id, lambda { |type|
    where(type_id: type)
  }

  scope :chatwork, -> { where(type_id: :chatwork) }
  scope :slack, -> { where(type_id: :slack) }
end

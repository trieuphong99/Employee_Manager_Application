# frozen_string_literal: true

class Customer < ApplicationRecord
  has_one_attached :logo
  validates :name, :short_name, :address, presence: true
  has_many :projects, dependent: :destroy
end

# frozen_string_literal: true

# == Schema Information
#
# Table name: compensations
#
#   id                                :integer          not null, primary key
#   name                              :string
#   resource_type                     :string
#   resource_id                       :integer
#   created_at                        :datetime         not null
#   updated_at                        :datetime         not null
#   account_id                        :integer          not null, foreign key

class Role < ApplicationRecord
  has_many :accounts, through: :accounts_roles

  belongs_to :resource,
             polymorphic: true,
             optional: true

  before_save :clean_data

  validates :resource_type,
            inclusion: { in: Rolify.resource_types },
            allow_nil: true
  validate :valid_name_role

  scopify

  private

  def valid_name_role
    errors.add(:name, "format not right") if name.present? && !ROLE.include?(name.downcase)
  end

  def clean_data
    self.name = name.downcase
  end
end

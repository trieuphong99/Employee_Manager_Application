class AccountSerializer < ActiveModel::Serializer
  has_one :profile
  has_many :roles

  attributes :id, :email, :code, :joining_date, :id_card,
    :official_date, :contract_type, :position, :status

  def contract_type
    object.contract_type.capitalize if object.contract_type.present?
  end

  def position
    object.position.capitalize
  end
end

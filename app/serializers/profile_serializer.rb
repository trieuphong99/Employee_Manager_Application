class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_number, :address, :sex, :date_of_birth

  def name
    object.name.split.map(&:capitalize).join(" ")
  end

  def address
    object.address.titleize if object.address.present?
  end

  def sex
    object.sex.capitalize
  end
end

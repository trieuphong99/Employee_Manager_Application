class RoleSerializer < ActiveModel::Serializer
  attributes :id, :name

  def name
    object.name.split.map(&:capitalize).join(" ")
  end
end

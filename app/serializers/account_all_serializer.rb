class AccountAllSerializer < ActiveModel::Serializer
  attributes :id, :name, :joining_date, :position

  def name
    object.profile.name.split.map(&:capitalize).join(" ")
  end
end

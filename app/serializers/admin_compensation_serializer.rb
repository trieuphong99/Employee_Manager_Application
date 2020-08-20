class AdminCompensationSerializer < CompensationSerializer
  attributes :name, :code, :email

  def name
    object.account.profile.name.split.map(&:capitalize).join(" ")
  end

  def code
    object.account.code
  end

  def email
    object.account.email
  end
end

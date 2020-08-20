class AdminTimesheetRequestSerializer < TimesheetRequestSerializer
  attributes :email, :name, :code

  def email
    object.account.email
  end

  def name
    object.account.profile.name.split.map(&:capitalize).join(" ")
  end

  def code
    object.account.code
  end
end
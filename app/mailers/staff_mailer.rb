class StaffMailer < ApplicationMailer
  default from: "notify@mysite.com"

  def register_compensation email, compensation, user
    @compensation = compensation
    @user = user
    mail(to: email, subject: "Register Compensation")
  end

  def register_overtime email, overtime, user
    @overtime = overtime
    @user = user
    mail(to: email, subject: "Register Overtime")
  end

  def accept_dayoff_request dayoff_request, admin
    @admin = admin
    @dayoff_request = dayoff_request
    mail(to: dayoff_request.account.email, subject: "Accept Dayoff Request",
      from: @admin.email)
  end

  def register_timesheet_request email, timesheet_request, user
    @timesheet_request = timesheet_request
    @user = user
    mail(to: email, subject: "Register Edit Timesheet")
  end
end

class AdminMailer < ApplicationMailer
  def new_time_edit_request email, request_user, time_edit_attributes
    @request_user = request_user
    @time_edit_attributes = time_edit_attributes
    mail(to: email, subject: "Time Editing Request")
  end

  def new_dayoff_registration_request email, request_user, dayoff_reg_attributes
    @request_user = request_user
    @dayoff_reg_attributes = dayoff_reg_attributes
    mail(to: email, subject: "Dayoff Registration Request")
  end

  def accept_offset compensation, admin
    @admin = admin
    @compensation = compensation
    mail(to: @compensation.account.email, subject: "Accept offset", from: @admin.email)
  end

  def accept_overtime overtime, admin
    @admin = admin
    @overtime = overtime
    mail(to: @overtime.account.email, subject: "Accept overtime", from: @admin.email)
  end

  def accept_timesheet_request timesheet_request, admin
    @admin = admin
    @timesheet_request = timesheet_request
    mail(to: @timesheet_request.account.email, subject: "Accept timesheet", from: @admin.email)
  end
end

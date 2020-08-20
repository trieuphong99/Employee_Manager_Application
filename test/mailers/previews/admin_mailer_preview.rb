class AdminMailerPreview < ActionMailer::Preview
  def new_time_edit_request
    time_edit_attributes = Timesheet.new(date: "01/01/2020", start_at: "08:00", end_at: "17:00",
      reason: "em quen ko checkin")
    email = "trieuphong328@gmail.com"
    request_user = Account.first
    AdminMailer.new_time_edit_request(email, request_user, time_edit_attributes)
  end

  # Preview this email at
  def new_dayoff_registration_request
    dayoff_reg_attributes = Dayoff.new(request_date: "01/01/2020", from_date: "01/01/2020",
      to_date: "02/01/2020", status: "half day off", reason: "Em co viec ban")
    email = "trieuphong328@gmail.com"
    request_user = Account.first
    AdminMailer.new_dayoff_registration_request(email, request_user, dayoff_reg_attributes)
  end

  # Preview this email at http://localhost:3000/rails/mailers/admin_mailer/accept_offset
  def accept_offset
    AdminMailer.accept_offset.deliver_now
  end
end

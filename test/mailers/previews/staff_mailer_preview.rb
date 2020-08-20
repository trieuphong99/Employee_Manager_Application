# Preview all emails at http://localhost:3000/rails/mailers/staff_mailer
class StaffMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/staff_mailer/register_compensation
  def register_compensation
    accounts = Account.with_role(:admin)
    emails = accounts.pluck(:email)
    compensation = Compensation.first
    StaffMailer.register_compensation(emails[0], compensation).deliver_now
  end

  def accept_dayoff_request
    admin = Account.with_role(:admin).first
    dayoff_request = Dayoff.new(request_date: "01/01/2020", from_date: "01/01/2020", to_date: "02/02/2020",
      confirmation_status: "Confirmed", account_id: 1)
    request_user = Account.first
    StaffMailer.accept_dayoff_request(admin, request_user, dayoff_request)
  end
end

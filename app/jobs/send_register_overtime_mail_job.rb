class SendRegisterOvertimeMailJob < ApplicationJob
  queue_as :default

  def perform overtime, user
    @overtime = overtime
    @user = user
    @emails = Account.get_admin_emails
    @emails.each { |email| StaffMailer.register_overtime(email, @overtime, @user).deliver_now }
  end
end

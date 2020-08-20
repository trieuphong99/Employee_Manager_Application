class SendRegisterCompensationMail < ApplicationJob
  queue_as :default

  def perform compensation, user
    @compensation = compensation
    @user = user
    @emails = Account.get_admin_emails
    @emails.each { |email| StaffMailer.register_compensation(email, @compensation, @user).deliver_now }
  end
end

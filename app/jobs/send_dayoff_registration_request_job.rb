class SendDayoffRegistrationRequestJob < ApplicationJob
  queue_as :default

  def perform request_user, dayoff_reg_attributes
    @dayoff_reg_attributes = dayoff_reg_attributes
    @request_user = request_user
    @emails = Account.get_admin_emails
    @emails.each { |email| AdminMailer.new_dayoff_registration_request(email, @request_user, @dayoff_reg_attributes).deliver_now }
  end
end

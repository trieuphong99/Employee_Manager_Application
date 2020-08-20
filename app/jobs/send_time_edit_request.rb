class SendTimeEditRequest < ApplicationJob
  queue_as :default

  def perform request_user, time_edit_attrributes
    @time_edit_attrributes = time_edit_attrributes
    @request_user = request_user
    @emails = Account.get_admin_emails
    @emails.each { |email| AdminMailer.new_time_edit_request(email, @request_user, @time_edit_attributes).deliver_now }
  end
end

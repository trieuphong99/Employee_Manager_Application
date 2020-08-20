class SendAcceptDayoffRequestJob < ApplicationJob
  queue_as :default

  def perform dayoff_request, admin
    StaffMailer.accept_dayoff_request(dayoff_request, admin).deliver_now
  end
end

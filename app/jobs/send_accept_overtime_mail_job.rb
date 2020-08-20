class SendAcceptOvertimeMailJob < ApplicationJob
  queue_as :default

  def perform overtime, admin
    AdminMailer.accept_overtime(overtime, admin).deliver_now
  end
end

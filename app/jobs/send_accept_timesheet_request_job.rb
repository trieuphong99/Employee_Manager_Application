class SendAcceptTimesheetRequestJob < ApplicationJob
  queue_as :default

  def perform timesheet_request, admin
    AdminMailer.accept_timesheet(timesheet_request, admin).deliver_now
  end
end

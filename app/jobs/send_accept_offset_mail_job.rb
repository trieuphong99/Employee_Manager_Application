class SendAcceptOffsetMailJob < ApplicationJob
  queue_as :default

  def perform compensation, admin
    AdminMailer.accept_offset(compensation, admin).deliver_now
  end
end

class RegisterNotificationStaffBroadcastJob < ApplicationJob
  queue_as :notification

  def perform register_name, register
    ActionCable.server.broadcast "staff_register_channel:#{register.account.id}",
      notification: "Your #{register_name} has been #{register.confirmation_status}."
  end
  end

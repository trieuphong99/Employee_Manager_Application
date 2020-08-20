class StaffChannel < ApplicationCable::Channel
  def subscribed
    unless current_user.is_admin?
      stream_from "staff_checkin_channel:#{current_user.id}"
      stream_from "staff_checkout_channel:#{current_user.id}"
      stream_from "staff_register_channel:#{current_user.id}"
    end
  end

  def unsubscribed
  end

  def checkin_notification
    CheckinNotificationBroadcastJob.perform_now(current_user)
  end

  def checkout_notification
    CheckoutNotificationBroadcastJob.perform_now(current_user)
  end
end

class CheckoutNotificationBroadcastJob < ApplicationJob
  queue_as :notification

  def perform user
    if user.timesheets.today.first.present? && user.timesheets.today.first.nil?
      ActionCable.server.broadcast "staff_checkout_channel:#{user.id}", notification: "Checkout please!"
    end
  end
end

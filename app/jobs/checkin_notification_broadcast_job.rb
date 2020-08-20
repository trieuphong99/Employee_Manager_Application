class CheckinNotificationBroadcastJob < ApplicationJob
  queue_as :notification

  def perform user
    if user.timesheets.today.empty?
      ActionCable.server.broadcast "staff_checkin_channel:#{user.id}", notification: "Checkin please!"
    end
  end
end

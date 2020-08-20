class AdminChannel < ApplicationCable::Channel
  def subscribed
    stream_from "admin_channel:#{current_user.id}" if current_user.is_admin?
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

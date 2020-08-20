class RegisterNotificationAdminBroadcastJob < ApplicationJob
  queue_as :notification

  def perform register_name, user, register
    Account.with_role(:admin).each do |admin|
      next unless register_name != "compensation"

      ActionCable.server.broadcast "admin_channel:#{admin.id}",
        register_name: register_name,
        name: user.profile.name,
        reason: register.reason
    end
  end
end

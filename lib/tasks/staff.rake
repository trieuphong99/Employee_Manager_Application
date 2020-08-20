namespace :staff do
  desc "notification"
  task checkin_notification: :environment do
    Account.with_role(:staff).each do |user|
      CheckinNotificationBroadcastJob.perform_now(user)
    end
  end

  task checkout_notification: :environment do
    Account.with_role(:staff).each do |user|
      CheckoutNotificationBroadcastJob.perform_now(user)
    end
  end

  task check_compensation: :environment do
    Account.with_role(:staff).each do |user|
      user.compensations.where("confirmation_status = 'doing' AND date < ?", Date.today).update_all(confirmation_status: "failed")
    end
  end
end

# Learn more: http://github.com/javan/whenever
require_relative "environment"
ENV.each { |k, v| env(k, v) }
set :environment, Rails.env
set :output, "#{path}/log/cron_log.log"

every 1.day, at: ["0:55 am", "0:59 am"] do
  rake "staff:checkin_notification"
end

every 1.day, at: "10:00 am" do
  rake "staff:checkout_notification"
end

every 1.day, at: "6:00 pm" do
  rake "staff:check_compensation"
end

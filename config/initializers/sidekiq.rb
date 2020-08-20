Sidekiq::Extensions.enable_delay!
template = ERB.new File.new("#{Rails.root}/config/redis.yml").read
redis = YAML.safe_load(template.result(binding))[::Rails.env]
Sidekiq.configure_server do |config|
  config.redis = { url: redis["url"] }
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis["url"] }
end

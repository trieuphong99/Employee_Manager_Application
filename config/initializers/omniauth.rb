# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :chatwork, ENV["CHATWORK_CLIENT_ID"], ENV["CHATWORK_CLIENT_SECRET"],
           scope: ["rooms.all:read_write", "users.profile.me:read"]
  provider :slack, ENV["SLACK_CLIENT_ID"], ENV["SLACK_CLIENT_SECRET"],
           scope: "identify,team:read,users:read,channels:read,chat:write:user"
end
OmniAuth.config.logger = Rails.logger

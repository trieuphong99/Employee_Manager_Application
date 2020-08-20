# frozen_string_literal: true

class SlackService
  require "rest-client"
  attr_reader :token, :options

  def initialize token, options
    @token = token
    @options = options
  end

  # def send_message
  #   response = RestClient.post("https://slack.com/api/chat.postMessage",
  #                              token: token, channel: options[:report_room],
  #                              text: format_body_message(options), as_user: true)
  # end

  private

  def format_body_message options
    "Account: #{options[:email]}\n- *Daily report #{Time.now.strftime('%Y/%m/%d %H:%M')}*\n
    ----------------------\n
    #{options[:report_content]}"
  end
end

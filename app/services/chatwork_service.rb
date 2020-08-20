# frozen_string_literal: true

class ChatworkService
  require "chatwork"
  attr_reader :token, :options

  def initialize token, options
    ChatWork.access_token = token
    @options = options
  end

  def get_info
    chatwork_rooms = ChatWork::Room.get
    chatwork_rooms.select { |room| room.type == "group" }
      .map { |room| { room_id: room.room_id, name: room.name } }
  end

  def send_message
    ChatWork::Message.create(room_id: options[:report_room], body: format_body_message(options))
  end

  private

  def format_body_message options
    "Account: #{options[:email]}\
    [info][title] Daily report #{Time.now.strftime('%Y/%m/%d %H:%M')}[/title]#{options[:report_content]}[/info]"
  end
end

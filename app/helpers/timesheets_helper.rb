# frozen_string_literal: true

module TimesheetsHelper
  def display_hour time
    time&.strftime("%H:%M")
  end
end

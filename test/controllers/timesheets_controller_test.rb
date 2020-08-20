# frozen_string_literal: true

require "test_helper"

class TimesheetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get timesheets_url
    assert_response :found
  end
end

# frozen_string_literal: true

require "test_helper"

class TimesheetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @account = build_stubbed(:account)
    @timesheet = @account.timesheets.build(
      date: Date.today,
      start_at: Time.now,
      end_at: Time.now,
      reason: ""
    )
  end

  test "shoul be valid" do
    assert @timesheet.valid?
  end

  test "status should be right format" do
    @timesheet.status = "abc"
    assert_not @timesheet.valid?
  end

  test "date should be present" do
    @timesheet.date = "       "
    assert_not @timesheet.valid?
  end
end

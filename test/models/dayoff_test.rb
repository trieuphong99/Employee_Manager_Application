# frozen_string_literal: true

require "test_helper"

class DayoffTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @account = build_stubbed(:account)
    @dayoff = @account.dayoffs.build(
      date: Date.today,
      reason: "om dau benh tat",
      status: "full_day-off"
    )
  end

  test "should be valid" do
    assert @dayoff.valid?
  end

  test "date should be present" do
    @dayoff.date = "      "
    assert_not @dayoff.valid?
  end

  test "reason should be present" do
    @dayoff.reason = "   "
    assert_not @dayoff.valid?
  end

  test "reason should not be too long" do
    @dayoff.reason = "a" * 151
    assert_not @dayoff.valid?
  end

  test "status should be present" do
    @dayoff.status = "    "
    assert_not @dayoff.valid?
  end

  test "status should be right format" do
    @dayoff.status = "abc"
    assert_not @dayoff.valid?
  end
end

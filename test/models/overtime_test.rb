# frozen_string_literal: true

require "test_helper"

class OvertimeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @account = build_stubbed(:account)
    @overtime = @account.overtimes.build(
      date: Date.today,
      start_at: Time.now,
      end_at: Time.now
    )
  end

  test "should be valid" do
    assert @overtime.valid?
  end

  test "date should be present" do
    @overtime.date = "      "
    assert_not @overtime.valid?
  end

  test "start time should be present" do
    @overtime.start_at = "      "
    assert_not @overtime.valid?
  end

  test "end time should be present" do
    @overtime.end_at = "      "
    assert_not @overtime.valid?
  end
end

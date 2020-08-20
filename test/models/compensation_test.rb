# frozen_string_literal: true

require "test_helper"

class CompensationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @account = build_stubbed(:account)
    @compensation = @account.compensations.build(
      date: Date.today,
      for_date: Date.yesterday.strftime(DATE),
      start_at: Time.now,
      end_at: Time.now
    )
  end

  test "should be valid" do
    assert @compensation.valid?
  end

  test "date should be present" do
    @compensation.date = "      "
    assert_not @compensation.valid?
  end

  test "for date should be present" do
    @compensation.for_date = "    "
    assert_not @compensation.valid?
  end

  test "for date should be set for the previous days" do
    (Date.tomorrow..(Date.tomorrow + 1)).each { |item| @compensation.for_date << "#{item.strftime(DATE)} " }
    # @compensation.for_date = "01/01/2019"
    assert_not @compensation.valid?
  end
end

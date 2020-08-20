# frozen_string_literal: true

require "test_helper"

class ProfileTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @account = build_stubbed(:account)
    @profile = @account.build_profile(
      name: "Nguyen Thanh Nam",
      phone_number: "0123456789",
      address: "Ha noi",
      sex: "male",
      date_of_birth: Date.today
    )
  end

  test "should be valid" do
    assert @profile.valid?
  end

  test "name shoud be present" do
    @profile.name = "      "
    assert_not @profile.valid?
  end

  test "phone number should be present" do
    @profile.phone_number = "         "
    assert_not @profile.valid?
  end

  test "phone number should not be too long" do
    @profile.phone_number = "3" * 13
    assert_not @profile.valid?
  end

  test "phone number should not be too short" do
    @profile.phone_number = "3" * 7
    assert_not @profile.valid?
  end

  test "date of birth should be present" do
    @profile.date_of_birth = "         "
    assert_not @profile.valid?
  end

  test "sex should be present" do
    @profile.sex = "  "
    assert_not @profile.valid?
  end

  test "sex should be right format" do
    @profile.sex = "abc"
    assert_not @profile.valid?
  end
end

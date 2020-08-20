# frozen_string_literal: true

require "test_helper"

class AccountTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @account = Account.new(
      email: "ex@gmail.com",
      password: "123456",
      joining_date: Date.today,
      position: "developer",
      id_card: "123456789123"
    )
  end

  test "should be valid" do
    assert @account.valid?
  end

  test "id_card should be present" do
    @account.id_card = "          "
    assert_not @account.valid?
  end

  test "email should be present" do
    @account.email = "    "
    assert_not @account.valid?
  end

  test "email should not be too long" do
    @account.email = "a" * 100 + "@example.com"
    assert_not @account.valid?
  end

  test "email validation should accept valid addresses" do
    valid_addresses = %w(user@example.com USER@foo.COM A_US-ER@foo.bar.org first.last@foo.jp)
    valid_addresses.each do |valid_address|
      @account.email = valid_address
      assert @account.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "email validation should reject invalid addresses" do
    invalid_addresses = %w(user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com)
    invalid_addresses.each do |invalid_address|
      @account.email = invalid_address
      assert_not @account.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "email address should be unique" do
    duplicate_account = @account.dup
    duplicate_account.email = @account.email.upcase
    @account.save
    assert_not duplicate_account.valid?
  end
end

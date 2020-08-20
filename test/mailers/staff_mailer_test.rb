require "test_helper"

class StaffMailerTest < ActionMailer::TestCase
  test "register_compensation" do
    mail = StaffMailer.register_compensation
    assert_equal "Register compensation", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end
end

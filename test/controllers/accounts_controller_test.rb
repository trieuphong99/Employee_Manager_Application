# frozen_string_literal: true

require "test_helper"

class AccountsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = build_stubbed(:admin_account)
    @admin.add_role :admin
    @staff = build_stubbed(:staff_account)
    @staff.add_role :staff
  end

  test "should get index when login with admin" do
    sign_in(@admin)
    get users_url
    assert_redirected_to root_path
  end

  test "should redirect index when logged in with staff" do
    sign_in(@staff)
    get users_url
    assert_redirected_to root_path
  end

  test "should create when logged in with admin" do
    sign_in(@admin)
    assert_no_difference "Account.count" do
      post users_url, params: {
        joining_date: "13-9-2019",
        official_date: "23-02-2020",
        contract_type: "Part-Time",
        id_card: "1234567890",
        email: "duong98kk@gmail.com",
        password: "123456",
        position: "intern",
        roles: "staff",
        status: "active",
        profile_attributes: {
          name: "Đỗ Tùng Dương",
          phone_number: "+84969374623",
          date_of_birth: "23-2-1998",
          sex: "male",
          address: "Quốc Oai-Hà Nội-Việt Nam"
        },
        roles_attributes: [
          {
            name: "staff"
          },
          {
            name: "admin"
          }
        ]
      }
    end
    assert_response :success
  end

  test "should redirect create when logged in with staff" do
    sign_in(@staff)
    assert_no_difference "Account.count" do
      post users_url, params: {
        joining_date: "13-9-2019",
        official_date: "23-02-2020",
        contract_type: "Part-Time",
        id_card: "1234567890",
        email: "duong98kk@gmail.com",
        password: "123456",
        position: "intern",
        roles: "staff",
        status: "active",
        profile_attributes: {
          name: "Đỗ Tùng Dương",
          phone_number: "+84969374623",
          date_of_birth: "23-2-1998",
          sex: "male",
          address: "Quốc Oai-Hà Nội-Việt Nam"
        },
        roles_attributes: [
          {
            name: "staff"
          },
          {
            name: "admin"
          }
        ]
      }
    end
    assert_redirected_to root_path
  end

  test "should redirect show when logged in as wrong user" do
    sign_in(@staff)
    get user_url(@admin)
    assert_redirected_to root_path
  end
end

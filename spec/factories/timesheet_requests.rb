FactoryBot.define do
  factory :timesheet_request do
    date { "2020-05-21" }
    start_at { "2020-05-21 8:00:00" }
    end_at { "2020-05-21 17:00:00" }
    reason_in { "MyString" }
    reason_out { "MyString" }
    reason { "MyString" }
  end
end

FactoryBot.define do
  factory :overtime do
    date {Date.today}
    start_at {Date.today.beginning_of_day + 18.0.hours}
    end_at {Date.today.beginning_of_day + 21.0.hours}
    reason {"imp"}
  end
end

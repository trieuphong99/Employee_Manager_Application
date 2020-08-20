FactoryBot.define do
  factory :dayoff do
    request_date {Date.today}
    from_date {Date.today}
    to_date {Date.tomorrow + 1.day}
    reason {"Dau dau, dau rang, dau tay, dau chan"}
    status {"Long Day-off"}
  end

  trait :dayoff_for_a_day do
    from_date {Date.today}
    to_date {Date.today}
  end
end

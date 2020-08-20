FactoryBot.define do
  factory :compensation do
    date {"02/03/2020"}
    for_date {"01/03/2020"}

    trait :compensation2 do
      date {"03/03/2020"}
      for_date {"28/02/2020"}
    end

    trait :compensation_today do
      date {Date.tomorrow}
      for_date {Date.today}
    end
  end
end

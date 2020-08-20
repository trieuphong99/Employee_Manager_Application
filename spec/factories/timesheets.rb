FactoryBot.define do
  factory :timesheet do
    date {"29/02/2020"}
    start_at {"08:00:00 29/02/2020"}
    end_at {"17:00:00 29/02/2020"}
    request_approving {"Confirmed"}

    trait :lack do
      date {"01/03/2020"}
      start_at {"08:00:00 01/03/2020"}
      end_at {"16:00:00 01/03/2020"}
    end

    trait :excess do
      date {"02/03/2020"}
      start_at {"08:00:00 02/03/2020"}
      end_at {"20:00:00 02/03/2020"}
    end

    trait :lack2 do
      date {"28/02/2020"}
      start_at {"08:00:00 28/02/2020"}
      end_at {"16:00:00 28/02/2020"}
    end

    trait :excess2 do
      date {"03/03/2020"}
      start_at {"08:00:00 03/03/2020"}
      end_at {"20:00:00 03/03/2020"}
    end

    trait :today do
      date {Date.today}
      start_at {Date.today.beginning_of_day + 8.hours}
      end_at {nil}
    end

    trait :morning_off do
      date {Date.yesterday}
      start_at {Date.yesterday.beginning_of_day + 11.hours}
      end_at {Date.yesterday.beginning_of_day + 17.hours}
    end

    trait :afternoon_off do
      date {Date.yesterday - 1.day}
      start_at {date.beginning_of_day + 8.hours}
      end_at {date.beginning_of_day + 14.hours}
    end

    trait :half_mor_half_after do
      date {Date.yesterday - 2.day}
      start_at {date.beginning_of_day + 10.hours}
      end_at {date.beginning_of_day + 15.hours}
    end

    trait :today_late do
      date {Date.today}
      start_at {Date.today.to_s + " 08:30:00"}
    end
  end
end

FactoryBot.define do
  factory :account do
    code { "B000001" }
    email { "namt@gmail.com" }
    password {"123456"}
    joining_date { Date.today }
    official_date { Date.today }
    contract_type { "part time" }
    position { "developer" }
    id_card {"123456789123"}
    status { true }

    trait :admin_account do
      code { "B000002" }
      email { "admin@ex.com" }
      contract_type { "full time" }
      id_card {"123456789125"}
    end

    trait :staff_account do
      code { "B000003" }
      email { "staff@ex.com" }
      id_card {"123456789124"}
    end
  end
end

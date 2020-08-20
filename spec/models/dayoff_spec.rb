require "rails_helper"

RSpec.describe Dayoff, type: :model do
  before(:all) do
    Account.destroy_all
    @account = create(:account)
    @dayoff = build(:dayoff, account_id: @account.id)
  end

  context "validates" do
    it "is valid with valid attributes" do
      expect(@dayoff).to be_valid
    end

    it "is not valid without request_date" do
      @invalid_dayoff = build(:dayoff, request_date: nil, account_id: @account.id)
      expect(@invalid_dayoff).to_not be_valid
    end

    it "is not valid without status" do
      @invalid_dayoff = build(:dayoff, status: nil, account_id: @account.id)
      expect(@invalid_dayoff).to_not be_valid
    end

    it "is not valid without reason" do
      @invalid_dayoff = build(:dayoff, reason: nil, account_id: @account.id)
      expect(@invalid_dayoff).to_not be_valid
    end

    it "is not valid with invalid reason length" do
      @invalid_dayoff = build(:dayoff, reason: "a" * 201, account_id: @account.id)
      expect(@invalid_dayoff).to_not be_valid
    end

    it "to_date must be greater than or equal to from_date" do
      @invalid_dayoff = build(:dayoff, from_date: Date.today, to_date: Date.yesterday,
        account_id: @account.id)
      expect(@invalid_dayoff).to_not be_valid
    end
  end

  describe "validates date range" do
    context "from_date not within exist date range" do
      it "to_date equals to exist from_date" do
        @invalid_dayoff = build(:dayoff, from_date: Date.today - 3.days,
          to_date: Date.today, account_id: 2)
        expect(@invalid_dayoff).to_not be_valid
      end

      it "to_date within exist date range" do
        @invalid_dayoff = build(:dayoff, from_date: Date.today - 3.days, to_date: Date.tomorrow,
          account_id: 2)
        expect(@invalid_dayoff).to_not be_valid
      end

      it "to_date greater than exist to_date" do
        @invalid_dayoff = build(:dayoff, from_date: Date.today - 3.days, to_date: Date.tomorrow + 1.day,
          account_id: 2)
        expect(@invalid_dayoff).to_not be_valid
      end

      # be valid
      it "to_date smaller than exist from_date" do
        dayoff = build(:dayoff, from_date: 2.days.ago, to_date: 1.day.ago,
          account_id: 2)
        expect(@dayoff).to be_valid
      end

      it "from_date greater than exist to_date" do
        dayoff = build(:dayoff, from_date: Date.tomorrow + 2.days, to_date: Date.tomorrow + 3.days,
          account_id: 2)
        expect(@dayoff).to be_valid
      end
    end

    context "from_date within exist date range" do
      it "to_date equals to from_date" do
        @invalid_dayoff = build(:dayoff, from_date: Date.today, to_date: Date.today,
          account_id: 2)
        expect(@invalid_dayoff).to_not be_valid
      end

      it "to_date within date range" do
        @invalid_dayoff = build(:dayoff, from_date: Date.today, to_date: Date.tomorrow + 1.day,
          account_id: 2)
        expect(@invalid_dayoff).to_not be_valid
      end

      it "to_date greater than to_date of date range" do
        @invalid_dayoff = build(:dayoff, from_date: Date.today, to_date: Date.tomorrow + 2.days,
          account_id: 2)
        expect(@invalid_dayoff).to_not be_valid
      end
    end

    context "create another dayoff for a day" do
      it "from_date equals to exist from_date" do
        @invalid_dayoff = build(:dayoff, :dayoff_for_a_day, from_date: Date.today,
          to_date: Date.today, account_id: 2)
        expect(@invalid_dayoff).to_not be_valid
      end

      it "from_date smaller than exist from_date" do
        dayoff = build(:dayoff, from_date: Date.yesterday, to_date: Date.yesterday,
          account_id: 2)
        expect(@dayoff).to be_valid
      end

      it "from_date greater than exist from_date" do
        dayoff = build(:dayoff, from_date: Date.tomorrow, to_date: Date.tomorrow,
          account_id: 2)
        expect(@dayoff).to be_valid
      end
    end
  end
end

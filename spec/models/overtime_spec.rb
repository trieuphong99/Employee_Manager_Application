require "rails_helper"

RSpec.describe Overtime, type: :model do
  before(:all) do
    Account.destroy_all
    @account = create(:account)
    @overtime = build(:overtime, account_id: @account.id)
  end

  context "validates" do
    it "is valid with valid attributes" do
      expect(@overtime).to be_valid
    end

    it "is not valid without a date" do
      @overtime2 = build(:overtime, date: nil, account_id: @account.id)
      expect(@overtime2).to_not be_valid
    end

    it "is not valid without a start_at" do
      @overtime2 = build(:overtime, start_at: nil, account_id: @account.id)
      expect(@overtime2).to_not be_valid
    end

    it "is not valid without a end_at" do
      @overtime2 = build(:overtime, end_at: nil, account_id: @account.id)
      expect(@overtime2).to_not be_valid
    end

    it "is not valid without a reason" do
      @overtime2 = build(:overtime, reason: nil, account_id: @account.id)
      expect(@overtime2).to_not be_valid
    end

    it "is greater than the maximum number of reason" do
      @overtime2 = build(:overtime, account_id: @account.id, reason: "a" * 1001)
      expect(@overtime2).to_not be_valid
    end

    it "start_at must be smaller end_at" do
      @overtime2 = build(:overtime, start_at: Date.today.beginning_of_day + 18.0.hours,
                          end_at: Date.today.beginning_of_day + 17.0.hours,
                          account_id: @account.id)
      expect(@overtime2).to_not be_valid
    end
  end
end

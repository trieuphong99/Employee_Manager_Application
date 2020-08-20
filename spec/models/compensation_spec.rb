require "rails_helper"

RSpec.describe Compensation, type: :model do
  before(:all) do
    Account.destroy_all
    @account = create(:account)
    create(:timesheet, :lack, account_id: @account.id)
    create(:timesheet, :excess, account_id: @account.id)
    @compensation = build(:compensation, account_id: @account.id)
  end

  context "validates" do
    it "is valid with valid attributes" do
      expect(@compensation).to be_valid
    end

    it "is not valid without a date" do
      @compensation2 = build(:compensation, date: nil, account_id: @account.id)
      expect(@compensation2).to_not be_valid
    end

    it "is not valid without a for_date" do
      @compensation2 = build(:compensation, for_date: nil, account_id: @account.id)
      expect(@compensation2).to_not be_valid
    end

    it "for_date must be smaller date" do
      @compensation2 = build(:compensation, date: "02/01/2019", for_date: "02/03/2019", account_id: @account.id)
      expect(@compensation2).to_not be_valid
    end
  end
end

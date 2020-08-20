require 'rails_helper'

RSpec.describe TimesheetRequest, type: :model do
  before(:all) do
    Account.destroy_all
    @account = create(:account)
    @timesheet_request = build(:timesheet_request, account_id: @account.id)
  end

  context "validates" do
    it "is valid with valid attributes" do
      expect(@timesheet_request).to be_valid
    end

    it "is not valid without a date" do
      @timesheet_request2 = build(:timesheet_request, date: nil, account_id: @account.id)
      expect(@timesheet_request2).to_not be_valid
    end

    it "is not valid without a start_at" do
      @timesheet_request2 = build(:timesheet_request, start_at: nil, account_id: @account.id)
      expect(@timesheet_request2).to_not be_valid
    end

    it "is not valid without a reason" do
      @timesheet_request2 = build(:timesheet_request, reason: nil, account_id: @account.id)
      expect(@timesheet_request2).to_not be_valid
    end

    it "is greater than the maximum number of reason" do
      @timesheet_request2 = build(:timesheet_request, account_id: @account.id, reason: "a" * 1001)
      expect(@timesheet_request2).to_not be_valid
    end

    it "start_at must be smaller end_at" do
      @timesheet_request2 = build(:timesheet_request, start_at: Date.today.beginning_of_day + 18.0.hours,
                          end_at: Date.today.beginning_of_day + 17.0.hours,
                          account_id: @account.id)
      expect(@timesheet_request2).to_not be_valid
    end
  end
end

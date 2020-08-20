require "rails_helper"

RSpec.describe Account, type: :model do
  before(:all) do
    @account1 = create(:account)
  end

  context "validates" do
    it "is valid with valid attributes" do
      expect(@account1).to be_valid
    end

    it "is not valid without a id_card" do
      @account2 = build(:account, :staff_account, id_card: nil)
      expect(@account2).to_not be_valid
    end

    it "is less than the minimum number of id_card" do
      @account2 = build(:account, :staff_account, id_card: "12345678")
      expect(@account2).to_not be_valid
    end

    it "is greater than the maximum number of id_card" do
      @account2 = build(:account, :staff_account, id_card: "1234567891234")
      expect(@account2).to_not be_valid
    end

    it "id_card uniqueness" do
      @account2 = build(:account, :staff_account, id_card: "123456789123")
      expect(@account2).to_not be_valid
    end

    it "is not valid without a joining_date" do
      @account2 = build(:account, :staff_account, joining_date: nil)
      expect(@account2).to_not be_valid
    end

    it "is not valid without a email" do
      @account2 = build(:account, :staff_account, email: nil)
      expect(@account2).to_not be_valid
    end

    it "is greater than the maximum number of email" do
      @account2 = build(:account, :staff_account, email: "a" * 91 + "@gmail.com")
      expect(@account2).to_not be_valid
    end

    it "email uniqueness" do
      @account2 = build(:account, :staff_account, email: "namt@gmail.com")
      expect(@account2).to_not be_valid
    end

    it "must less than official date" do
      @account2 = build(:account, :staff_account, joining_date: "29/02/2020", official_date: "28/02/2020")
      expect(@account2).to_not be_valid
    end

    it "code uniqueness" do
      Account.last.update(code: "B000001")
      @account2 = build(:account, :staff_account, code: "B000001")
      expect(@account2).to_not be_valid
    end
  end

  context "associations" do
    it "associated profile, timesheet, compensation, dayoff, overtime should be destroyed" do
      @profile = create(:profile, account_id: @account1.id)
      @timesheet = create(:timesheet, account_id: @account1.id)
      @timesheet_lack = create(:timesheet, :lack, account_id: @account1.id)
      @timesheet_excess = create(:timesheet, :excess, account_id: @account1.id)
      @compensation = create(:compensation, account_id: @account1.id)
      @dayoff = create(:dayoff, account_id: @account1.id)
      @overtime = create(:overtime, account_id: @account1.id)
      expect { @account1.destroy }.to change(Profile, :count).by(-1)
        .and change(Timesheet, :count).by(-3)
        .and change(Compensation, :count).by(-1)
        .and change(Dayoff, :count).by(-1)
        .and change(Overtime, :count).by(-1)
    end
  end
end

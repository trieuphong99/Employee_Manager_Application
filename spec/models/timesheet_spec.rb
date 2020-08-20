require "rails_helper"

RSpec.describe Timesheet, type: :model do
  before(:all) do
    Account.destroy_all
    @account = create(:account)
    @normal = create(:timesheet, account_id: @account.id)
    @today = create(:timesheet, :today, account_id: @account.id)
    @mor_off = create(:timesheet, :morning_off, account_id: @account.id)
    @after_off = create(:timesheet, :afternoon_off, account_id: @account.id)
    @mor_and_after = create(:timesheet, :half_mor_half_after, account_id: @account.id)
  end

  context "time service" do
    it "return exactly woking start" do
      expect(@normal.start_at).to eq (@normal.start_at)  
      expect(@today.working_start).to eq(@today.start_at) 
      expect(@mor_off.working_start).to eq(@mor_off.date.beginning_of_day + 13.hour)
      expect(@after_off.working_start).to eq(@after_off.start_at)
      expect(@mor_and_after.working_start).to eq(@mor_and_after.start_at)
    end

    it "return current time in today if end null" do
      timesheet = TimesService.new(@today.date, @today.start_at, @today.end_at, @today.status)
      expect(timesheet.working_end.hour).to eq(Time.current.hour)  
    end
    
    it "return exactly woking hour" do
      expect(@normal.working_hour).to eq((@normal.end_at - @normal.start_at - 1.hour)/3600.round(2))  
      expect(@mor_off.working_hour).to eq((@mor_off.end_at - (@mor_off.date.beginning_of_day + 13.hour))/3600.round(2))
      expect(@after_off.working_hour).to eq((@after_off.date.beginning_of_day + 12.hour - @after_off.start_at)/3600.round(2))
      expect(@mor_and_after.working_hour).to eq((@mor_and_after.end_at - @mor_and_after.start_at - 1.hour)/3600.round(2))
    end

    it "return status half dayoff" do
      expect(@today).to_not eq("half day-off")  
      expect(@mor_off.status).to eq("half day-off")
      expect(@after_off.status).to eq("half day-off")
      expect(@mor_and_after.status).to eq("half day-off")
    end
  end
end

require 'rails_helper'

RSpec.describe TimesheetRequestsController, type: :controller do
  before(:each) do
    @account = create(:account)
    login(@account)
  end
  describe "POST #create" do
    context "with valid attributes" do
      it "saves the new timesheet request in the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:timesheet_request), format: "json"
        }.to change(TimesheetRequest, :count).by(1)
        ActionMailer::Base.deliveries.should_not be_empty
      end

      it "redirects to the ..." do
      end
    end

    context "with invalid attributes" do
      it "does not save the new timesheet request in the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:timesheet_request, reason: nil), format: "json"
        }.to_not change(TimesheetRequest, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:timesheet_request, start_at: nil), format: "json"
        }.to_not change(TimesheetRequest, :count)
      end
    end
  end

  describe "PUT #update" do
    before(:each) do
      @timesheet_request = create(:timesheet_request, account_id: @account.id)
    end
    context "changes @timesheet_requests's attributes" do
      it "located the requested @timesheet_request" do
        put :update, params: FactoryBot.attributes_for(:timesheet_request,
                                                       reason: "Em quen check in",
                                                       id: @timesheet_request.id), format: "json"
        expect(assigns(:timesheet_request)).to eq(@timesheet_request)
        @timesheet_request.reload
        @timesheet_request.reason.should eq("Em quen check in")
        put :update, params: FactoryBot.attributes_for(:timesheet_request,
                                                       start_at: Date.today.beginning_of_day + 17.5.hours,
                                                       id: @timesheet_request.id), format: "json"
        expect(assigns(:timesheet_request)).to eq(@timesheet_request)
        put :update, params: FactoryBot.attributes_for(:timesheet_request,
                                                       end_at: Date.today.beginning_of_day + 22.0.hours,
                                                       id: @timesheet_request.id), format: "json"
        expect(assigns(:timesheet_request)).to eq(@timesheet_request)
        put :update, params: FactoryBot.attributes_for(:timesheet_request, date: Date.tomorrow, id: @timesheet_request.id), format: "json"
        expect(assigns(:timesheet_request)).to eq(@timesheet_request)
        @timesheet_request.reload
        @timesheet_request.date.should eq(Date.tomorrow)
      end

      it "redirects to the ..." do
      end
    end

    context "invalid attributes" do
      it "does not change @timesheet_request's attributes" do
        put :update, params: FactoryBot.attributes_for(:timesheet_request, reason: nil, id: @timesheet_request.id), format: "json"
        expect(assigns(:timesheet_request)).to eq(@timesheet_request)
        @timesheet_request.reload
        @timesheet_request.reason.should_not eq(nil)
        put :update, params: FactoryBot.attributes_for(:timesheet_request, start_at: nil, id: @timesheet_request.id), format: "json"
        expect(assigns(:timesheet_request)).to eq(@timesheet_request)
        @timesheet_request.reload
        @timesheet_request.start_at.should_not eq(nil)
        put :update, params: FactoryBot.attributes_for(:timesheet_request, date: nil, id: @timesheet_request.id), format: "json"
        expect(assigns(:timesheet_request)).to eq(@timesheet_request)
        @timesheet_request.reload
        @timesheet_request.date.should_not eq(nil)
      end
    end
  end

  describe "GET #index" do
    before(:each) do
      @timesheet_request = create(:timesheet_request, account_id: @account.id)
    end

    it "populates an array of timesheet_requests" do
      get :index, params: {format: "json"}
      expect(assigns(:timesheet_requests)).to_not eq([@timesheet_request])
    end

    it "renders the staff_dashboard" do
      get :index
      expect(response).to render_template "dashboards/staff_dashboard"
    end
  end
end

require "rails_helper"
require "sidekiq/testing"

RSpec.describe DayoffsController, type: :controller do
  before(:each) do
    @account = create(:account)
    login(@account)
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "saves new dayoff to the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:dayoff), format: "json"
        }.to change(Dayoff, :count).by(1)
        ActionMailer::Base.deliveries.should_not be_empty
      end

      it "redirects to the ..." do
      end
    end

    context "with invalid attributes" do
      it "does not save new dayoff to the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:dayoff, from_date: Date.today, to_date: Date.tomorrow,
            request_date: nil), format: "json"
        }.to_not change(Dayoff, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:dayoff, from_date: Date.today, to_date: Date.tomorrow,
            reason: nil), format: "json"
        }.to_not change(Dayoff, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:dayoff, from_date: Date.today, to_date: Date.tomorrow,
            status: nil), format: "json"
        }.to_not change(Dayoff, :count)
      end
    end
  end

  describe "PUT #update" do
    before(:each) do
      @dayoff = create(:dayoff, account_id: @account.id)
    end

    context "with valid attributes" do
      it "changes dayoff's attributes" do
        put :update, params: FactoryBot.attributes_for(:dayoff,
            from_date: Date.tomorrow,
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.from_date.should eq(Date.tomorrow)

        put :update, params: FactoryBot.attributes_for(:dayoff,
            to_date: Date.tomorrow + 2.days,
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.to_date.should eq(Date.tomorrow + 2.days)

        put :update, params: FactoryBot.attributes_for(:dayoff,
            reason: "em co viec ban",
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.reason.should eq("em co viec ban")

        put :update, params: FactoryBot.attributes_for(:dayoff,
            status: "Long Day-off",
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.status.should eq("long day-off")
      end
    end

    context "with invalid attributes" do
      it "does not change dayoff's attributes" do
        put :update, params: FactoryBot.attributes_for(:dayoff,
            request_date: nil,
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.request_date.should_not eq(nil)

        put :update, params: FactoryBot.attributes_for(:dayoff,
            to_date: Date.today,
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.to_date.should_not eq(Date.tomorrow)

        put :update, params: FactoryBot.attributes_for(:dayoff,
            reason: nil,
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.reason.should_not eq(nil)

        put :update, params: FactoryBot.attributes_for(:dayoff,
            status: nil,
            id: @dayoff.id), format: "json"
        expect(assigns(:dayoff)).to eq(@dayoff)
        @dayoff.reload
        @dayoff.status.should_not eq(nil)
      end
    end
  end

  describe "GET #index" do
    before(:each) do
      @dayoff = create(:dayoff, account_id: @account.id)
    end

    it "populates an array of dayoffs" do
      get :index, params: {format: "json"}
      expect(assigns(:dayoffs)).to eq([@dayoff])
    end

    it "renders the staff_dashboard" do
      get :index
      expect(response).to render_template "dashboards/staff_dashboard"
    end
  end
end

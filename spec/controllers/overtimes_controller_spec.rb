require "rails_helper"
require "sidekiq/testing"

RSpec.describe OvertimesController, type: :controller do
  before(:each) do
    @account = create(:account)
    login(@account)
  end
  describe "POST #create" do
    context "with valid attributes" do
      it "saves the new overtime in the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:overtime), format: "json"
        }.to change(Overtime, :count).by(1)
        ActionMailer::Base.deliveries.should_not be_empty
      end

      it "redirects to the ..." do
      end
    end

    context "with invalid attributes" do
      it "does not save the new overtime in the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:overtime, reason: nil), format: "json"
        }.to_not change(Overtime, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:overtime,
                                end_at: Date.today.beginning_of_day + 10.0.hours), format: "json"
        }.to_not change(Overtime, :count)
      end
    end
  end

  describe "PUT #update" do
    before(:each) do
      @overtime = create(:overtime, account_id: @account.id)
    end
    context "changes @overtime's attributes" do
      it "located the requested @overtime" do
        put :update, params: FactoryBot.attributes_for(:overtime,
                                                       reason: "Em xin phep lam cho imp",
                                                       id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        @overtime.reload
        @overtime.reason.should eq("Em xin phep lam cho imp")
        put :update, params: FactoryBot.attributes_for(:overtime,
                                                       start_at: Date.today.beginning_of_day + 17.5.hours,
                                                       id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        put :update, params: FactoryBot.attributes_for(:overtime,
                                                       end_at: Date.today.beginning_of_day + 22.0.hours,
                                                       id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        put :update, params: FactoryBot.attributes_for(:overtime, date: Date.tomorrow, id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        @overtime.reload
        @overtime.date.should eq(Date.tomorrow)
      end

      it "redirects to the ..." do
      end
    end

    context "invalid attributes" do
      it "does not change @overtime's attributes" do
        put :update, params: FactoryBot.attributes_for(:overtime, reason: nil, id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        @overtime.reload
        @overtime.reason.should_not eq(nil)
        put :update, params: FactoryBot.attributes_for(:overtime, start_at: nil, id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        @overtime.reload
        @overtime.start_at.should_not eq(nil)
        put :update, params: FactoryBot.attributes_for(:overtime, end_at: nil, id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        @overtime.reload
        @overtime.end_at.should_not eq(nil)
        put :update, params: FactoryBot.attributes_for(:overtime, date: nil, id: @overtime.id), format: "json"
        expect(assigns(:overtime)).to eq(@overtime)
        @overtime.reload
        @overtime.date.should_not eq(nil)
      end
    end
  end

  describe "GET #index" do
    before(:each) do
      @overtime = create(:overtime, account_id: @account.id)
    end

    it "populates an array of overtimes" do
      get :index, params: {format: "json"}
      expect(assigns(:overtimes)).to eq([@overtime])
    end

    it "renders the staff_dashboard" do
      get :index
      expect(response).to render_template "dashboards/staff_dashboard"
    end
  end
end

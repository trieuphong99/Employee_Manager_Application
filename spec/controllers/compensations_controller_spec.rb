require "rails_helper"
require "sidekiq/testing"

RSpec.describe CompensationsController, type: :controller do
  before(:each) do
    @account = create(:account)
    create(:timesheet, :lack, account_id: @account.id)
    create(:timesheet, :excess, account_id: @account.id)
    create(:timesheet, :lack2, account_id: @account.id)
    create(:timesheet, :excess2, account_id: @account.id)
    create(:timesheet, :today_late, account_id: @account.id)
    login(@account)
  end
  describe "POST #create" do
    context "with valid attributes" do
      it "saves the new compensation in the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:compensation), format: "json"
        }.to change(Compensation, :count).by(1)
        expect {
          post :create, params: FactoryBot.attributes_for(:compensation, :compensation2), format: "json"
        }.to change(Compensation, :count).by(1)
        expect {
          post :create, params: FactoryBot.attributes_for(:compensation, :compensation_today), format: "json"
        }.to change(Compensation, :count).by(1)
        ActionMailer::Base.deliveries.should_not be_empty
      end

      it "redirects to the ..." do
      end
    end

    context "with invalid attributes" do
      before(:each) do
        post :create, params: FactoryBot.attributes_for(:compensation, :compensation2), format: "json"
      end
      it "does not save the new compensation in the database" do
        expect {
          post :create, params: FactoryBot.attributes_for(:compensation, date: nil), format: "json"
        }.to_not change(Compensation, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:compensation,
                                for_date: nil), format: "json"
        }.to_not change(Compensation, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:compensation,
                                for_date: "28/02/2020"), format: "json"
        }.to_not change(Compensation, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:compensation,
                                date: "03/03/2020"), format: "json"
        }.to_not change(Compensation, :count)

        expect {
          post :create, params: FactoryBot.attributes_for(:compensation,
                                for_date: "02/03/2020"), format: "json"
        }.to_not change(Compensation, :count)
        expect {
          post :create, params: FactoryBot.attributes_for(:compensation,
                                date: "01/05/2020"), format: "json"
        }.to_not change(Compensation, :count)
      end
    end
  end

  describe "PUT #update" do
    before(:each) do
      @compensation = create(:compensation, account_id: @account.id)
    end
    context "changes @compensation's attributes" do
      it "located the requested @compensation" do
        put :update, params: FactoryBot.attributes_for(:compensation,
          date: "03/03/2020",
          id: @compensation.id), format: "json"
        expect(assigns(:compensation)).to eq(@compensation)
        @compensation.reload
        @compensation.date.should eq("03/03/2020".to_date)

        put :update, params: FactoryBot.attributes_for(:compensation,
          for_date: "28/02/2020",
          id: @compensation.id), format: "json"
        expect(assigns(:compensation)).to eq(@compensation)
        @compensation.reload
        @compensation.for_date.should eq("28/02/2020".to_date)

        put :update, params: FactoryBot.attributes_for(:compensation,
          date: Date.today + 7.days,
          id: @compensation.id), format: "json"
        expect(assigns(:compensation)).to eq(@compensation)
        @compensation.reload
        @compensation.for_date.should_not eq(Date.today + 7.days)
      end

      it "redirects to the ..." do
      end
    end

    context "invalid attributes" do
      before(:each) do
        create(:compensation, :compensation2, account_id: @account.id)
      end
      it "does not change @compensation's attributes" do
        put :update, params: FactoryBot.attributes_for(:compensation,
          date: nil,
          id: @compensation.id), format: "json"
        expect(assigns(:compensation)).to eq(@compensation)
        @compensation.reload
        @compensation.date.should_not eq(nil)

        put :update, params: FactoryBot.attributes_for(:compensation,
          for_date: "28/02/2020",
          id: @compensation.id), format: "json"
        expect(assigns(:compensation)).to eq(@compensation)
        @compensation.reload
        @compensation.for_date.should_not eq("28/02/2020".to_date)

        put :update, params: FactoryBot.attributes_for(:compensation,
          date: "03/03/2020",
          id: @compensation.id), format: "json"
        expect(assigns(:compensation)).to eq(@compensation)
        @compensation.reload
        @compensation.for_date.should_not eq("03/03/2020".to_date)

        put :update, params: FactoryBot.attributes_for(:compensation,
          date: "01/05/2020",
          id: @compensation.id), format: "json"
        expect(assigns(:compensation)).to eq(@compensation)
        @compensation.reload
        @compensation.for_date.should_not eq("01/05/2020".to_date)
      end
    end
  end

  describe "GET #index" do
    before(:each) do
      @compensation = create(:compensation, account_id: @account.id)
    end

    it "populates an array of compensations" do
      get :index, params: {format: "json", from_date: "01/01/2020"}
      expect(assigns(:compensations)).to eq([@compensation])
    end

    it "renders the staff_dashboard" do
      get :index
      expect(response).to render_template "dashboards/staff_dashboard"
    end
  end

  describe "DELETE #destroy" do
    before(:each) do
      @compensation = create(:compensation, account_id: @account.id)
    end

    it "deletes the compensation" do
      expect{
        delete :destroy, params: {id: Compensation.first.id}, format: "json"
      }.to change(Compensation,:count).by(-1)
    end
  end
end

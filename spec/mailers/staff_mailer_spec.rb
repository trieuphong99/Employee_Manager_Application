require "rails_helper"

RSpec.describe StaffMailer, type: :mailer do
  before(:each) do
    @account = create(:account)
    create(:profile, account_id: @account.id)
    @email = "admin@email.com"
  end
  describe "register_overtime" do
    before(:each) do
      @overtime = create(:overtime, account_id: @account.id)
    end
    let(:mail) { described_class.register_overtime(@email, @overtime, @account).deliver_now }

    it "renders the subject" do
      expect(mail.subject).to eq("Register Overtime")
    end

    it "renders the receiver email" do
      expect(mail.to).to eq([@email])
    end

    it "renders the sender email" do
      expect(mail.from).to eq(["notify@mysite.com"])
    end

    it "assigns @name" do
      expect(mail.body.encoded).to match(@account.profile.name)
    end

    it "assigns @overtime_url" do
      # expect(mail.body.encoded)
      #   .to match("http://aplication_url/#{user.id}/overtime")
    end
  end

  describe "register_compensation" do
    before(:each) do
      create(:timesheet, :lack, account_id: @account.id)
      create(:timesheet, :excess, account_id: @account.id)
      @compensation = create(:compensation, account_id: @account.id)
    end
    let(:mail) { described_class.register_compensation(@email, @compensation, @account).deliver_now }

    it "renders the subject" do
      expect(mail.subject).to eq("Register Compensation")
    end

    it "renders the receiver email" do
      expect(mail.to).to eq([@email])
    end

    it "renders the sender email" do
      expect(mail.from).to eq(["notify@mysite.com"])
    end

    it "assigns @name" do
      expect(mail.body.encoded).to match(@account.profile.name)
    end

    it "assigns @overtime_url" do
      # expect(mail.body.encoded)
      #   .to match("http://aplication_url/#{user.id}/overtime")
    end
  end
end

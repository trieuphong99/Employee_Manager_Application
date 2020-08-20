require "rails_helper"

RSpec.describe AdminMailer, type: :mailer do
  before(:each) do
    @account = create(:account)
    create(:profile, account_id: @account.id)
    @email = "admin@email.com"
  end

  describe "register_dayoff" do
    before(:each) do
      @dayoff = create(:dayoff, account_id: @account.id)
    end
    let(:mail) { described_class.new_dayoff_registration_request(@email, @account, @dayoff).deliver_now }

    it "renders the subject" do
      expect(mail.subject).to eq("Dayoff Registration Request")
    end

    it "renders the receiver email" do
      expect(mail.to).to eq([@email])
    end

    it "renders the sender email" do
      expect(mail.from).to eq(["from@example.com"])
    end

    it "assigns @name" do
      expect(mail.body.encoded).to match(@account.profile.name)
    end

    it "assigns @dayoff_url" do
      # expect(mail.body.encoded)
      #   .to match("http://aplication_url/#{user.id}/dayoff")
    end
  end
end

require "csv"

class ImportCsvService
  def initialize filepath
    @filepath = filepath
  end

  def create_account
    csv = Roo::Spreadsheet.open(@filepath)
    header = csv.row 1
    accounts = []
    (2..csv.last_row).each do |i|
      row = [header, csv.row(i)].transpose.to_h
      account = row.slice("email", "joining_date", "id_card", "password",
          "official_date", "contract_type", "position", "status")
      profile = row.slice("name", "phone_number", "address", "sex", "date_of_birth")
      role = [{"name" => row["role"]}]
      account["profile_attributes"] = profile
      account["roles_attributes"] = role
      account["skip_validate_date"] = true
      accounts << account
    end
    Account.create!(accounts)
  end
end

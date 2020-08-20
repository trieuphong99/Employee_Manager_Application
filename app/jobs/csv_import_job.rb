class CsvImportJob < ApplicationJob
  queue_as :default

  def perform filepath
    ImportCsvService.new(filepath).create_account
  end
end

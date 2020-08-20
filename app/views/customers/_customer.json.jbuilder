# frozen_string_literal: true

json.extract! customer, :id, :name, :address, :short_name, :created_at, :updated_at
json.url customer_url(customer, format: :json)
# frozen_string_literal: true

json.extract! invoice, :id, :project_id, :amount, :invoice_date, :payment_date, :created_at, :updated_at
json.url invoice_url(invoice, format: :json)

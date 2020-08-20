# frozen_string_literal: true

json.extract! project,
    :id,
    :customer_id,
    :name,
    :start_date,
    :end_date,
    :invoice_type,
    :amount,
    :created_at,
    :updated_at
json.url project_url(project, format: :json)

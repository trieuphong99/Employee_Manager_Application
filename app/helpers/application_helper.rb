# frozen_string_literal: true

module ApplicationHelper
  def admin?
    current_account && current_account.email == "nghialv@bunbusoft.com"
  end

  def room_options
    return [] unless today_timesheet
    return [] if today_timesheet.new_record?
    return [] unless today_timesheet.provider

    today_timesheet.provider.rooms.map { |h| [h[:name], h[:room_id]] }
  end

  def display_months
    today = Date.today
    [today.year, today.year + 1].map do |year|
      (1..12).to_a.map { |i| "#{i}-#{year}" }
    end.flatten
  end

  def display_currency amount, currency = :USD
    return unless amount

    unit = case currency.to_sym
           when :USD
             "$"
           when :JPY
             "¥"
           else
             "đ"
      end
    number_to_currency(amount, unit: unit, precision: 0)
  end

  def display_invoice_style invoice
    return "lightgray" unless invoice

    if invoice.initial?
      if invoice.export_expired?
        "export_expired"
      else
        "initial"
      end
    elsif invoice.invoice_exported?
      if deposit_expired?
        "deposit_expired"
      else
        "invoice_exported"
      end
    elsif invoice.deposit?
      "deposited"
    end
  end
end

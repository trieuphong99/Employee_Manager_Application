# frozen_string_literal: true

class DashboardsController < BaseController
  def index
    @today_timesheet = current_account.timesheets.today.first
  end

  def dashboard
    if current_user.is_admin?
      render "admin_dashboard"
    else
      render "staff_dashboard"
    end
  end
end

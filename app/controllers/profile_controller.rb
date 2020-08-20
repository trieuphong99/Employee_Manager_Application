# frozen_string_literal: true

class ProfileController < ApplicationController
  #   authorize_resource
  def index
    respond_to do |format|
      format.html {
        if current_user.is_admin?
          render "dashboards/admin_dashboard"
        else
          render "dashboards/staff_dashboard"
        end
      }
    end
  end
end

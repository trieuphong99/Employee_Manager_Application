class Admin::BaseController < ApplicationController
  before_action :admin_authenticate!

  private

  def admin_authenticate!
    redirect_to root_url unless current_user.is_admin?
  end
end

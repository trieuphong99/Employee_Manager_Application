# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # check_authorization
  protect_from_forgery with: :null_session
  before_action :authenticate_account!

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, alert: exception.message
  end

  def current_user
    current_account
  end
end

module Api::V1
  class ApiController < ApplicationController
    protect_from_forgery with: :exception, unless: :json_request?
    protect_from_forgery with: :null_session, if: :json_request?
    skip_before_action :verify_authenticity_token, if: :json_request?
    rescue_from ActionController::InvalidAuthenticityToken, with: :invalid_auth_token
    before_action :set_current_user, if: :json_request?

    private

    def json_request?
      request.format.json?
    end

    def authenticate_user! *args
      super and return if args.present?

      json_request? ? authenticate_v1_account! : super
    end

    def invalid_auth_token
      respond_to do |format|
        format.html { redirect_to sign_in_path, error: "Login invalid or expired" }
        format.json { head 401 }
      end
    end

    def set_current_user
      @set_current_user ||= warden.authenticate(scope: :v1_account)
    end
  end
end

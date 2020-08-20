module Api::V1
  class SessionsController < Devise::SessionsController
    skip_before_action :verify_signed_out_user
    respond_to :json

    # POST /v1/login
    def create
      unless request.format == :json
        sign_out
        render status: :not_acceptable,
                json: { message: "JSON requests only." } and return
      end
      resource = warden.authenticate!(auth_options)
      if resource.blank?
        render status: :unauthorized,
                json: { response: "Access denied." } and return
      end

      sign_in(resource_name, resource)
      respond_with resource, location:
        after_sign_in_path_for(resource) do |format|
          format.json { render json:
            {
              success: true,
              jwt: current_token,
              response: "Authentication successful"
            }
          }
      end
    end
    private
    def current_token
      request.env["warden-jwt_auth.token"]
    end
  end
end
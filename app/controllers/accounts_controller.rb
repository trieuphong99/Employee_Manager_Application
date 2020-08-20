# frozen_string_literal: true

class AccountsController < BaseController
  load_and_authorize_resource

  def index; end

  def show
    user = current_user
    respond_to do |format|
      format.html {
        redirect_to root_url
      }
      format.json {
        render json: user, each_serializer: AccountSerializer, status: :ok
      }
    end
  end

  def create; end

  def change_password
    respond_to do |format|
      format.html {
        redirect_to root_url
      }
      format.json {
        if current_user.valid_password?(params[:current_password])
          if current_user.reset_password(params[:new_password], params[:password_confirmation])
            render json: current_user, each_serializer: AccountSerializer, status: :ok
          else
            render json: current_user.errors.full_messages, status: :unprocessable_entity
          end
        else
          render json: "Password is not correct", status: :unauthorized
        end
      }
    end
  end

  def profile; end

  def connection; end
end

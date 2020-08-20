# frozen_string_literal: true

class Admin::AccountsController < Admin::BaseController
  load_and_authorize_resource

  def index
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        if params[:all_user]
          render json: Account.all, each_serializer: AccountAllSerializer, status: :ok
        else
          users = get_index_data.page(params[:current_page]).per(PER_PAGE)
          render json: {
            total_page: @data.total_page,
            data: ActiveModel::SerializableResource.new(users)
          }, status: :ok
        end
      }
    end
  end

  def show
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: @account, each_serializer: AccountSerializer, status: :ok
      }
    end
  end

  def create
    account = Account.new(account_params)
    respond_to do |format|
      format.html {
        redirect_to root_url
      }
      format.json {
        if account.save
          render json: account, each_serializer: AccountSerializer, status: :ok
        else
          render json: account.errors.full_messages, status: :unprocessable_entity
        end
      }
    end
  end

  def update
    respond_to do |format|
      format.html {
        redirect_to root_url
      }
      format.json {
        if @account.update_attributes(account_params)
          render json: @account, each_serializer: AccountSerializer, status: :ok
        else
          render json: @account.errors.full_messages, status: :unprocessable_entity
        end
      }
    end
  end

  def destroy
    respond_to do |format|
      format.html {
        redirect_to root_url
      }
      format.json {
        if @account.is_admin? || @account.timesheets.present?
          render json: "Can not delete account", status: :not_acceptable
        else
          if @account.destroy
            render json: @account, each_serializer: AccountSerializer, status: :ok
          else
            render json: @account.errors.full_messages, status: :not_acceptable
          end
        end
      }
    end
  end

  def import_csv
    file = csv_params[:file]
    CsvImportJob.perform_later(file)
  end

  def profile; end

  def connection; end

  private

  def account_params
    params.permit(:email, :joining_date, :id_card, :password, :code,
      :official_date, :contract_type, :position, :status,
      profile_attributes: [:id, :name, :phone_number, :address, :sex, :date_of_birth],
      input_roles: [])
  end

  def csv_params
    params.require(:account).permit(:file)
  end

  def get_index_data
    accounts = Account.ransack(
      {email_cont: params[:name], profile_name_cont: params[:name]}, grouping: "or"
    ).result.includes(:profile)
    @data = FilterService.new(accounts, params)
    @data.result
  end
end

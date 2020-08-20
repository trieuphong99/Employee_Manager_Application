# frozen_string_literal: true

class CompensationsController < BaseController
  authorize_resource
  load_resource only: [:update, :destroy]
  before_action :get_timesheets_data, only: [:create, :update]
  def create
    @compensation = current_user.compensations.build(@compensation_param)
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }

      format.json {
        if @compensation.save
          SendRegisterCompensationMail.perform_later @compensation, current_user
          RegisterNotificationAdminBroadcastJob.perform_now("compensation", current_user, @compensation)
          render json: @compensation, each_serializer: CompensationSerializer, status: :ok
        else
          render json: @compensation.errors.full_messages.first, status: :unprocessable_entity
        end
      }
    end
  end

  def index
    data = get_index_data
    @compensations = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }

      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@compensations)
        }, status: :ok
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if @compensation.waiting?
          if @compensation.update_attributes(param_compensation)
            render json: @compensation, each_serializer: CompensationSerializer, status: :ok
          else
            render json: @compensation.errors.full_messages.first, status: :unprocessable_entity
          end
        else
          # render json: "Can not change after admin had allowed", status: :precondition_failed
          render json: "Không thể xóa sau khi admin xác nhận", status: :precondition_failed
        end
      }
    end
  end

  def destroy
    respond_to do |format|
      format.json {
        if @compensation.waiting?
          if @compensation.destroy
            render json: @compensation, each_serializer: AccountSerializer, status: :ok
          else
            render json: @compensation.errors.full_messages, status: :not_acceptable
          end
        else
          # render json: "Can not destroy after admin had allowed", status: :precondition_failed
          render json: "Không thể xóa sau khi admin xác nhận", status: :precondition_failed
        end
      }
    end
  end

  private
  def param_compensation
    params.permit(:date, :for_date)
  end

  def get_timesheets_data
    compensation_param_service = CompensationsService.new(param_compensation, current_user, params[:action])
    error_status = compensation_param_service.get_errors_status
    render json: error_status, status: :precondition_failed if error_status.present?
    @compensation_param = compensation_param_service.get_result
  end

  def get_index_data
    compensations = current_user.compensations
    @data = FilterService.new(compensations, params)
    @data.result
  end
end

class TimesheetRequestsController < ApplicationController
  authorize_resource
  load_resource only: :update

  def index
    data = get_index_data
    @timesheet_requests = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@timesheet_requests)
        }, status: :ok
      }
    end
  end
  
  def create
    @timesheet_request = current_user.timesheet_requests.register_day(timesheet_request_params[:date]).first
    respond_to do |format|
      format.html {
        redirect_to root_path
      }
      format.json {
        if @timesheet_request.nil?
          @timesheet_request = current_user.timesheet_requests.build(timesheet_request_params)
          if @timesheet_request.save
            SendTimeEditRequest.perform_later current_user, @timesheet_request
            RegisterNotificationAdminBroadcastJob.perform_now("timesheet_request", current_user, @timesheet_request)
            render json: @timesheet_request, each_serializer: TimesheetRequestSerializer, status: :ok
          else
            render json: @timesheet_request.errors.full_messages, status: :unprocessable_entity
          end
        else
          render json: "Can not request edit timesheet twice with same record", status: :unprocessable_entity
        end
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if !@timesheet_request.confirmed?
          if @timesheet_request.update_attributes(timesheet_request_params)
            render json: @timesheet_request, each_serializer: TimesheetRequestSerializer, status: :ok
          else
            render json: @timesheet_request.errors.full_messages, status: :unprocessable_entity
          end
        else
          render json: "Can not change when admin had allowed", status: :precondition_failed
        end
      }
    end
  end

  private

  def timesheet_request_params
    params.permit(:date, :start_at, :end_at, :reason_in, :reason_out, :reason)
  end

  def get_index_data
    timesheet_requests = current_user.timesheet_requests
    @data = FilterService.new(timesheet_requests, params)
    @data.result
  end
end

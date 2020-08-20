class Admin::TimesheetRequestsController < Admin::BaseController
  load_and_authorize_resource

  def update
    @timesheet_origin = @timesheet_request.account.timesheets.find_by(date: @timesheet_request.date)
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        if @timesheet_origin.nil?
          render json: "Timesheet do not exist", status: :unprocessable_entity
        else
          update_flag = begin
                          TimesheetRequest.transaction do
                            @timesheet_request.update_attributes(accept_params)
                            Timesheet.transaction(requires_new: true) do
                              @timesheet_origin.update_attributes(update_params(@timesheet_request))
                              raise ActiveRecord::Rollback if !@timesheet_request.confirmed?
                            end
                          end
                        rescue
                          false
                        end
          if update_flag.nil?
            @timesheet_origin.reload
            render json: {
              request: ActiveModel::SerializableResource.new(@timesheet_request, serializer: AdminTimesheetRequestSerializer),
              origin: ActiveModel::SerializableResource.new(@timesheet_origin, serializer: AdminTimesheetSerializer)
            }, status: :ok
          else
            render json: @timesheet_request.errors.full_messages + @timesheet_origin.errors.full_messages, status: :unprocessable_entity
          end
        end
      }
    end
  end

  def index
    data = get_index_data
    @timesheet_request = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@timesheet_request, each_serializer: AdminTimesheetRequestSerializer)
        }, status: :ok
      }
    end
  end

  def edit
  end

  private

  def accept_params
    params.permit(:confirmation_status)
  end

  def get_index_data
    timesheet_requests = TimesheetRequest.all
    timesheet_requests = timesheet_requests.by_user_id(params[:user_id]) if params[:user_id].present?
    @data = FilterService.new(timesheet_requests, params)
    @data.result
  end

  def update_params request
    {
      start_at: request.start_at, 
      end_at: request.end_at,
      reason_in: request.reason_in, 
      reason_out: request.reason_out
    }
  end
end
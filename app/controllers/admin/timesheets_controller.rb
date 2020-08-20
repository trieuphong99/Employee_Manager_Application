class Admin::TimesheetsController < Admin::BaseController
  load_and_authorize_resource

  def update
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        if @timesheet.update_attributes(update_timesheet_params)
          render json: @timesheet, serializer: AdminTimesheetSerializer, status: :ok
        else
          render json: @timesheet.errors.full_messages, status: :not_acceptable
        end
      }
    end
  end

  def index
    timesheets_data = get_index_data
    user = Account.find_by(id: params[:user_id])
    statistic = StatisticService.new(timesheets_data, user, params).result
    timesheets = timesheets_data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: {
          statistic: statistic,
          data: ActiveModel::SerializableResource.new(timesheets, each_serializer: AdminTimesheetSerializer)
        }, status: :ok
      }
    end
  end

  def show
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: @timesheet, serializer: AdminTimesheetSerializer, status: :ok
      }
    end
  end

  private

  def update_timesheet_params
    params.permit(:start_at, :end_at, :reason_in, :reason_out)
  end

  def get_index_data
    timesheets = Timesheet.all
    timesheets = timesheets.where(account_id: params[:user_id]) if params[:user_id].present?
    FilterService.new(timesheets, params).result
  end
end

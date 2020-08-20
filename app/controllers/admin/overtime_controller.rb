class Admin::OvertimeController < Admin::BaseController
  load_and_authorize_resource

  def update
    respond_to do |format|
      format.html {
        redirect_to root_path
      }
      format.json {
        if @overtime.update_attributes(accept_params)
          render json: @overtime, each_serializer: OvertimeSerializer, status: :ok
          SendAcceptOvertimeMailJob.perform_later @overtime, current_user
          RegisterNotificationStaffBroadcastJob.perform_now("overtime", @overtime)
        else
          render json: @overtime.errors.full_messages, status: :unprocessable_entity
        end
      }
    end
  end

  def index
    data = get_index_data
    @overtimes = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@overtimes, each_serializer: AdminOvertimeSerializer)
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
    overtimes = Overtime.all
    overtimes = overtimes.by_user_id(params[:user_id]) if params[:user_id].present?
    @data = FilterService.new(overtimes, params)
    @data.result
  end
end

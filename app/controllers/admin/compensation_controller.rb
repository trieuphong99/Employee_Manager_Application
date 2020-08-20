class Admin::CompensationController < Admin::BaseController
  load_and_authorize_resource
  def edit
  end

  def index
    data = get_index_data
    @compensations = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }

      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@compensations, each_serializer: AdminCompensationSerializer)
        }, status: :ok
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if @compensation.update_attributes(compensation_params)
          render json: @compensation, each_serializer: CompensationSerializer, status: :ok
          SendAcceptOffsetMailJob.perform_later @compensation, current_user
          RegisterNotificationStaffBroadcastJob.perform_now("compensation", @compensation)
        else
          render json: @compensation.errors.full_messages, status: :unprocessable_entity
        end
      }
    end
  end

  private
  def compensation_params
    params.require(:compensation).permit(:confirmation_status)
  end

  def get_index_data
    compensations = Compensation.all
    compensations = compensations.by_user_id(params[:user_id]) if params[:user_id].present?
    @data = FilterService.new(compensations, params)
    @data.result
  end
end

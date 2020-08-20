class Admin::DayoffsController < Admin::BaseController
  load_and_authorize_resource # load resource of dayoff model

  def index
    data = get_index_data
    @dayoffs = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }

      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@dayoffs, each_serializer: AdminDayoffSerializer)
        }, status: :ok
      }
    end
  end

  def update
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        if @dayoff.update_attribute(:confirmation_status, params[:confirmation_status])
          SendAcceptDayoffRequestJob.perform_now @dayoff, current_user
          RegisterNotificationStaffBroadcastJob.perform_now("dayoff", @dayoff)
          render json: @dayoff, each_serializer: DayoffSerializer, status: :ok
        else
          render json: @dayoff.errors.full_messages, status: :not_acceptable
        end
      }
    end
  end

  private

  def get_index_data
    dayoffs = Dayoff.all
    dayoffs = dayoffs.by_user_id(params[:user_id]) if params[:user_id].present?
    @data = FilterService.new(dayoffs, params)
    @data.result
  end
end

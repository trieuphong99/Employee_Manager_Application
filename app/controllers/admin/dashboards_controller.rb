class Admin::DashboardsController < Admin::BaseController
  def index
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: DashboardService.new.result, status: :ok
      }
    end
  end

  def pie_chart
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: PiechartService.new(params).result, status: :ok
      }
    end
  end

  def bar_chart
    respond_to do |format|
      format.html {
        render "dashboards/admin_dashboard"
      }
      format.json {
        render json: BarchartService.new(params).result, status: :ok
      }
    end
  end
end

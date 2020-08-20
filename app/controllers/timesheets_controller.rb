# frozen_string_literal: true

class TimesheetsController < BaseController
  require "rest-client"
  before_action :check_allow_ip!, only: [:create, :update]
  authorize_resource

  def index
    data = get_index_data
    statistic = StatisticService.new(data, current_user, params).result
    timesheets = data.page(params[:current_page]).per(PER_PAGE)
    compensation = TimesheetService.get_today_compensation_data
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        render json: {
          statistic: statistic,
          data: ActiveModel::SerializableResource.new(timesheets),
          compensation: compensation
        }, status: :ok
      }
    end
  end

  def create
    @today_timesheet = current_user.timesheets.today.first
    respond_to do |format|
      format.html {
        redirect_to root_path
      }
      format.json {
        if @today_timesheet.nil?
          @today_timesheet = current_account.timesheets.build(checkin_params)
          if @today_timesheet.save
            render json: "Your day start!", status: :ok
          else
            render json: @today_timesheet.errors.full_messages, status: :unprocessable_entity
          end
        else
          render json: "Can not record checkin time again", status: :unprocessable_entity
        end
      }
    end
  end

  def update
    @today_timesheet = current_account.timesheets.today.first
    respond_to do |format|
      format.html {
        redirect_to root_path
      }
      format.json {
        if @today_timesheet.update_attributes(checkout_params)
          TimesheetService.update_compensation(@today_timesheet)
          render json: @today_timesheet, each_serializer: TimesheetSerializer, status: :ok
        else
          render json: @today_timesheet.errors.full_messages, status: :unprocessable_entity
        end
      }
    end
  end

  def edit_reason
    @today_timesheet = current_account.timesheets.today.first
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        if @today_timesheet.update_attributes(reason_params)
          render json: @today_timesheet, each_serializer: TimesheetSerializer, status: :ok
        else
          render json: @today_timesheet.errors.full_messages, status: :unprocessable_entity
        end
      }
    end
  end

  def show
    @timesheet = current_user.timesheets.find(params[:id])
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        render json: @timesheet, serializer: TimesheetSerializer, status: :ok
      }
    end
  end
  

  def chatwork_callback
    @auth = auth
    rooms = ChatworkService.new(@auth.credentials.token, {}).get_info
    cw_provider = current_account.providers.chatwork&.first
    if cw_provider
      send_flash cw_provider.update_attributes(cw_provider_params(@auth, rooms)), "chatwork"
    else
      send_flash current_account.providers.create(cw_provider_params(@auth, rooms)), "chatwork"
    end
    redirect_to timesheets_path
  end

  def slack_callback
    @auth = auth
    request_url = "https://slack.com/api/channels.list?token=#{@auth['credentials']['token']}&pretty=1"
    response = JSON.parse(RestClient.get(request_url, accept: :json)).with_indifferent_access
    if response[:ok]
      sl_provider = current_account.providers.slack&.first
      rooms = response[:channels].map { |channel| { room_id: channel[:id], name: channel[:name] } }
      if sl_provider
        send_flash sl_provider.update_attributes(sl_provider_params(@auth, rooms)), "slack"
      else
        send_flash current_account.providers.create(sl_provider_params(@auth, rooms)), "slack"
      end
    else
      flash[:notice] = "Call slack api error!"
    end
    redirect_to timesheets_path
  end

  def get_rooms
    provider = current_account.providers.find_by(id: params[:type_id])
    render json: { rooms: (provider&.rooms&.as_json || {}) }
  end

  def profile
    @providers = current_account.providers
  end

  private

  def checkin_params
    params.permit(:date, :start_at, :reason_in)
  end

  def checkout_params
    params.permit(:end_at, :reason_out, :is_leave_early)
  end

  def reason_params
    params.permit(:reason_in, :reason_out)
  end

  def check_allow_ip!
    allow_ips = %w(14.162.128.1
                    183.91.2.175
                    14.232.42.179
                    1.54.203.155
                    118.70.67.83
                    ::1)

    return if allow_ips.include?(request.remote_ip)

    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        render json: "Can not record timesheet outside company!", status: :not_acceptable
      }
    end
  end

  def auth
    request.env["omniauth.auth"]
  end

  def send_flash status, type
    # flash[:notice] = if status
    #                    "Sync #{type} successfully!"
    #                  else
    #                    "Sync #{type} successfully!"
    #                  end
  end

  def cw_provider_params auth_params, rooms
    { uid: auth_params[:uid], type_id: :chatwork,
      credentials: auth_params[:credentials], rooms: rooms, info: auth_params[:info] }
  end

  def sl_provider_params auth_params, rooms
    { uid: auth_params[:uid], type_id: :slack,
      credentials: auth_params[:credentials], rooms: rooms, info: auth_params[:info] }
  end

  def get_index_data
    timesheets = current_user.timesheets
    FilterService.new(timesheets, params).result
  end
end

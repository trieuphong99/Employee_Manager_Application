# frozen_string_literal: true

class OvertimesController < ApplicationController
  authorize_resource
  load_resource only: :update

  def create
    @overtime = current_user.overtimes.register_day(overtime_params[:date]).first
    respond_to do |format|
      format.html {
        redirect_to root_path
      }
      format.json {
        if @overtime.nil?
          @overtime = current_user.overtimes.build(overtime_params)
          if @overtime.save
            SendRegisterOvertimeMailJob.perform_later @overtime, current_user
            RegisterNotificationAdminBroadcastJob.perform_now("overtime", current_user, @overtime)
            render json: @overtime, each_serializer: OvertimeSerializer, status: :ok
          else
            render json: @overtime.errors.full_messages, status: :unprocessable_entity
          end
        else
          render json: "Can not register overtime twice in a day", status: :unprocessable_entity
        end
      }
    end
  end

  def index
    data = get_index_data
    @overtimes = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@overtimes)
        }, status: :ok
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if !@overtime.confirmed?
          if @overtime.update_attributes(overtime_params)
            render json: @overtime, each_serializer: OvertimeSerializer, status: :ok
          else
            render json: @overtime.errors.full_messages, status: :unprocessable_entity
          end
        else
          render json: "Can not change when admin had allowed", status: :precondition_failed
        end
      }
    end
  end

  private

  def overtime_params
    params.permit(:date, :start_at, :end_at, :reason)
  end

  def get_index_data
    overtimes = current_user.overtimes
    @data = FilterService.new(overtimes, params)
    @data.result
  end
end

# frozen_string_literal: true

class DayoffsController < ApplicationController
  authorize_resource
  load_resource only: :update

  def index
    data = get_index_data
    @dayoffs = data.page(params[:current_page]).per(PER_PAGE)
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        render json: {
          total_page: @data.total_page,
          data: ActiveModel::SerializableResource.new(@dayoffs)
        }, status: :ok
      }
    end
  end

  def create
    @dayoff = current_user.dayoffs.build(dayoff_params)
    respond_to do |format|
      format.html {
        render "dashboards/staff_dashboard"
      }
      format.json {
        if @dayoff.save
          SendDayoffRegistrationRequestJob.perform_later current_account, @dayoff
          RegisterNotificationAdminBroadcastJob.perform_now("dayoff", current_user, @dayoff)
          render json: @dayoff, each_serializer: DayoffSerializer, status: :created
        else
          render json: @dayoff.errors.full_messages, status: :unprocessable_entity
        end
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if !@dayoff.confirmed?
          if @dayoff.update_attributes(dayoff_params)
            render json: @dayoff, each_serializer: DayoffSerializer, status: :ok
          else
            render json: @dayoff.errors.full_messages, status: :unprocessable_entity
          end
        else
          render json: "Can not change when admin had allowed", status: :precondition_failed
        end
      }
    end
  end

  private

  def dayoff_params
    params.permit(:request_date, :from_date, :to_date, :reason, :status, :is_paid)
  end

  def get_index_data
    dayoffs = current_user.dayoffs
    @data = FilterService.new(dayoffs, params)
    @data.result
  end
end

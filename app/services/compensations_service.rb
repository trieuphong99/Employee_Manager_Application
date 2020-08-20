class CompensationsService
  def initialize param_compensation, user, action
    user = user
    @action = action
    @compensation_param = param_compensation
    @timesheet_of_for_date = user.timesheets.find_by(date: @compensation_param[:for_date])
    @timesheet_of_date = user.timesheets.find_by(date: @compensation_param[:date])
    @errors_status = nil
  end

  def get_result
    @compensation_param
  end

  def get_errors_status
    check_condition_params
    @errors_status
  end

  def check_condition_params
    # check tồn tại timesheet của for_date
    if @timesheet_of_for_date.present?
      @off_hours = @timesheet_of_for_date.off_hour
      # check thời gian off (phải lớn hơn 0)
      if @off_hours <= 0
        # @errors_status = "Compensated date's off time is less than 0"
        @errors_status = "Số giờ làm thiếu của ngày cần làm bù phải lớn hơn 0"
        return
      end
    else
      # @errors_status = "Compensated date can't be blank"
      @errors_status = "Ngày cần làm bù không được để trống"
      return
    end

    # check tồn tại timesheet của date
    if @timesheet_of_date.present?
      @odd_hours = @timesheet_of_date.odd_hour
      # check thời gian odd (phải lớn hơn 0)
      if @odd_hours <= 0
        # @errors_status = "Compensation date's odd time is not greater than 0"
        @errors_status = "Số giờ làm thừa của ngày đăng ký làm bù phải lớn hơn 0"
        return
      end
      # so sánh thời gian odd và thời gian off
      if @odd_hours < @off_hours
        # @errors_status = "Compensate hours is less than total off time"
        @errors_status = "Số giờ làm thừa phải lớn hơn số giờ làm thiếu"
        return
      end
    else
      # nếu không tồn tại timesheet của date thì date phải lớn hơn ngày hiện tại
      if @compensation_param[:date].present? && @compensation_param[:date].to_date <= Date.today
        # @errors_status = "Registration date is invalid"
        @errors_status = "Ngày đăng ký làm bù phải lớn hơn ngày hiện tại"
        return
      end
      #for_date phải là ngày hiện tại thì mới được đăng ký trong tương lai
      if @compensation_param[:for_date].to_date != Date.today && @action == "create"
        # @errors_status = "Compensated date is not today"
        @errors_status = "Ngày cần làm bù không phải là ngày hiện tại"
        return
      end
    end
  end
end

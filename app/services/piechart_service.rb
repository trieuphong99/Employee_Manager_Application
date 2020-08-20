class PiechartService
  def initialize params
    @fromdate = params[:from_date].presence || Date.today.beginning_of_month
    @todate = params[:to_date].presence || Date.today
    @timesheet = Timesheet.daterange(@fromdate, @todate)
    @selection = params[:selection].present? ? params[:selection].split(",") : %w(in_late leave_early half_dayoff full_dayoff)
  end

  def result
    @selection.map do |n|
      data = {
        x: n,
        y: analystic(n)
      }
    end
  end

  private

  def analystic type
    case type
    when "in_late"
      result = @timesheet.in_late.count
    when "leave_early"
      result = @timesheet.leave_early.count
    when "full_dayoff"
      result = DashboardService.new.statistic_dayoff_in(@fromdate.to_date, @todate.to_date).first["sum"]
    when "half_dayoff"
      result = @timesheet.half_dayoff.count
    else
      result = 0
    end

    result
  end
end

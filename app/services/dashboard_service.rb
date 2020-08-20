class DashboardService
  def initialize
    today = Timesheet.today
    yesterday = Timesheet.yesterday
    this_week = Timesheet.daterange(Date.today.beginning_of_week, Date.today)
    this_month = Timesheet.daterange(Date.today.beginning_of_month, Date.today)
    @today_inlate = today.in_late.count
    @today_leave_early = today.leave_early.count
    @today_full_dayoff = Dayoff.in_date(Date.today).count
    @today_half_dayoff = today.half_dayoff.count
    @yesterday_inlate = yesterday.in_late.count
    @yesterday_leave_early = yesterday.in_late.count
    @yesterday_full_dayoff = Dayoff.in_date(Date.yesterday).count
    @yesterday_half_dayoff = yesterday.half_dayoff.count
    @this_week_inlate = this_week.in_late.count
    @this_week_leave_early = this_week.leave_early.count
    @this_week_full_dayoff = statistic_dayoff_in(Date.today.beginning_of_week, Date.today).first["sum"]
    @this_week_half_dayoff = this_week.half_dayoff.count
    @this_month_inlate = this_month.in_late.count
    @this_month_leave_early = this_month.leave_early.count
    @this_month_full_dayoff = statistic_dayoff_in(Date.today.beginning_of_month, Date.today).first["sum"]
    @this_month_half_dayoff = this_month.half_dayoff.count
  end

  def statistic_dayoff_in from_date, to_date
    sql = "
      select sum(
        case
        when to_date <= cast('#{from_date}' as date) or from_date >= cast('#{to_date}' as date) then
          0
        when from_date <= cast('#{from_date}' as date) and to_date >= cast('#{from_date}' as date) and to_date <= cast('#{to_date}' as date) then
          (to_date - cast('#{from_date}' as date) + 1)
        when from_date <= cast('#{from_date}' as date) and to_date >= cast('#{to_date}' as date) then
          (cast('#{to_date}' as date) - cast('#{from_date}' as date) + 1)
        when from_date >= cast('#{from_date}' as date) and to_date <= cast('#{to_date}' as date) then
          (to_date - from_date + 1)
        when from_date >= cast('#{from_date}' as date) and to_date >= cast('#{to_date}' as date) then
          (cast('#{to_date}' as date) - from_date + 1)
        else
          0
        end
        )
      from dayoffs
      where status != 'half day-off'
    "

    ActiveRecord::Base.connection.execute(sql).to_a
  end

  def result
    {
      today_inlate: @today_inlate,
      today_leave_early: @today_leave_early,
      today_full_dayoff: @today_full_dayoff,
      today_half_dayoff: @today_half_dayoff,
      yesterday_inlate: @yesterday_inlate,
      yesterday_leave_early: @yesterday_leave_early,
      yesterday_full_dayoff: @yesterday_full_dayoff,
      yesterday_half_dayoff: @yesterday_half_dayoff,
      this_week_inlate: @this_week_inlate,
      this_week_leave_early: @this_week_leave_early,
      this_week_full_dayoff: @this_week_full_dayoff,
      this_week_half_dayoff: @this_week_half_dayoff,
      this_month_inlate: @this_month_inlate,
      this_month_leave_early: @this_month_leave_early,
      this_month_full_dayoff: @this_month_full_dayoff,
      this_month_half_dayoff: @this_month_half_dayoff
    }
  end
end

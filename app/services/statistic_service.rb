class StatisticService
  def initialize timesheets, user, params
    @fromdate = params[:from_date].presence || Date.today.beginning_of_month
    @todate = params[:to_date].presence || Date.today
    @user = user
    @all = timesheets.count
    @total_page = (@all.to_f / PER_PAGE).ceil
    @in_late = timesheets.in_late.count
    @leave_early = timesheets.leave_early.count
    @in_late_and_leave_early = timesheets.in_late_and_leave_early.count
    @total_work = work_hour.first["sum"].to_f
    @total_off = off_hour.first["sum"].to_f
    @total_offset = odd_hour.first["sum"].to_f
    @full_day_off_has_allowed_and_paid = timesheets.full_day_off_has_allowed_and_paid.count
    @full_day_off_has_allowed_not_paid = timesheets.full_day_off_has_allowed_not_paid.count
    @full_day_off_not_allowed = timesheets.full_day_off_not_allowed.count
    @half_day_off_has_allowed_and_paid = timesheets.half_day_off_has_allowed_and_paid.count
    @half_day_off_has_allowed_not_paid = timesheets.half_day_off_has_allowed_not_paid.count
    @half_day_off_not_allowed = timesheets.half_day_off_not_allowed.count
  end

  def result
    {
      all: @all,
      total_page: @total_page,
      in_late: @in_late,
      total_work: @total_work,
      total_off: @total_off,
      total_offset: @total_offset,
      leave_early: @leave_early,
      in_late_and_leave_early: @in_late_and_leave_early,
      full_day_off_has_allowed_and_paid: @full_day_off_has_allowed_and_paid,
      full_day_off_has_allowed_not_paid: @full_day_off_has_allowed_not_paid,
      full_day_off_not_allowed: @full_day_off_not_allowed,
      half_day_off_has_allowed_and_paid: @half_day_off_has_allowed_and_paid,
      half_day_off_has_allowed_not_paid: @half_day_off_has_allowed_not_paid,
      half_day_off_not_allowed: @half_day_off_not_allowed
    }
  end

  private

  def off_hour
    sql = "
    select sum(
            case
            when interval '8h' > (end_at - start_at - interval '1h') then
              interval '8h' - (end_at - start_at - interval '1h')
            else
              interval '0h'
            end
            )
      from timesheets
      where #{@user.present? ? "account_id = '#{@user.id}' and" : ''}
            date >= '#{@fromdate.to_date}' and
            date <= '#{@todate.to_date}'
    "
    ActiveRecord::Base.connection.execute(sql).to_a
  end

  def work_hour
    sql = "
      select  sum(
                end_at - start_at - interval '1h'
                )
      from timesheets
      where #{@user.present? ? "account_id = '#{@user.id}' and" : ''}
            date >= '#{@fromdate.to_date}' and
            date <= '#{@todate.to_date}'
    "
    ActiveRecord::Base.connection.execute(sql).to_a
  end

  def odd_hour
    sql = "
      select sum(
              case
              when interval '8h' < (end_at - start_at - interval '1h') then
                (end_at - start_at - interval '1h') - interval '8h'
              else
                interval '0h'
              end
              )
      from timesheets
      where #{@user.present? ? "account_id = '#{@user.id}' and" : ''}
            date >= '#{@fromdate.to_date}' and
            date <= '#{@todate.to_date}'

    "
    ActiveRecord::Base.connection.execute(sql).to_a
  end
end

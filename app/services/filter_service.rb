class FilterService
  def initialize objects, params
    @objects = objects
    @filter_type = params[:filter_type].presence || "All"
    @sort_field = params[:sort_field].presence || "id"
    @sort_type = params[:sort_type].presence || "desc"
    @from_date = params[:from_date].presence || Date.today.beginning_of_month
    @to_date = params[:to_date].presence || Date.today
  end

  def result
    filter.order("#{@sort_field} #{@sort_type}")
  end

  def total_page
    (result.count.to_f / PER_PAGE).ceil
  end

  private

  def filter
    case @filter_type
    when "In late"
      @objects = @objects.in_late
    when "Leave early"
      @objects = @objects.leave_early
    when "In late and leave early"
      @objects = @objects.in_late_and_leave_early
    when "Full day-off has allowed and paid"
      @objects = @objects.full_day_off_has_allowed_and_paid
    when "Full day-off has allowed not paid"
      @objects = @objects.full_day_off_has_allowed_not_paid
    when "Full day-off not allowed"
      @objects = @objects.full_day_off_not_allowed
    when "Half day-off has allowed and paid"
      @objects = @objects.half_day_off_has_allowed_and_paid
    when "Half day-off has allowed not paid"
      @objects = @objects.half_day_off_has_allowed_not_paid
    when "Half day-off not allowed"
      @objects = @objects.half_day_off_not_allowed
    end
    return @objects.daterange(@from_date, @to_date) if @objects.respond_to? :daterange

    @objects
  end
end

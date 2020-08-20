class BarchartService
  def initialize params
    number = params[:number_of_week].present? ? params[:number_of_week].to_i - 1 : 0
    @to_date = Date.today
    @from_date = Date.today.beginning_of_week - number.weeks
    @worker = Timesheet.daterange(@from_date, @to_date).group("date").count
    @timesheet = Timesheet.daterange(Date.today.beginning_of_week - number.weeks, Date.today)
  end

  def result
    (@from_date..@to_date).map do |date|
      data = {
        date: date,
        worker: @worker[date] || 0
      }
    end
  end
end

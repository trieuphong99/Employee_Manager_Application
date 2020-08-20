#case in, out: 
#1: in <= 8 && out >= 17, thừa thời gian, work = out - 8 - 1
#2: 8 < in < 10 && out >= 17, đi muộn, work = out - in - 1
#3: in <= 8 && 15 < out < 17, về sớm, work = out - in - 1
#4: 8 < in < 10 && 15 < out < 17, đi muộn về sớm, work = out - in - 1
#5: 10 <= in <= 13 && out > 15, nghỉ sáng, work = out - 13
#6: in < 10 && 12 <= out <= 15, nghỉ chiều, work = 12 - in
#7: 10 <= in <= 12 && 13 <= out <= 15, làm nửa sáng nửa chiều, work = out - in -1 (pending)
#else: làm bình thường, work = out - in

class TimesService
  def initialize date, start_at, end_at, status
    @date = date
    @start = start_at
    @end = end_at
    @status = status
  end

  def working_start
    return unless @start

    default_start = @start.beginning_of_day + START_TIME.hour.hours
    afternoon_start = @start.beginning_of_day + START_AFTERNOON.hour.hours
    #in <= 8 then start = 8, 10 <= in <= 13 && out > 15 then start = 13
    if @start < default_start
      return default_start
    elsif @start.strftime(FORMAT_TIME).in_time_zone >= LATE_MORNING && 
          @start.strftime(FORMAT_TIME).in_time_zone <= START_AFTERNOON &&
          @end.present? && @end.strftime(FORMAT_TIME).in_time_zone > EARLY_AFTERNOON
      return afternoon_start
    else
      return @start
    end
  end

  def working_end
    #end = now if date is today
    return @end.presence || Time.current if @date.today?
    return unless @end
    #in < 10 && 12 <= out <= 15 then end = 12
    end_morning = @end.beginning_of_day + END_MORNING.hour.hours
    @end.strftime(FORMAT_TIME).in_time_zone > END_MORNING && 
    @end.strftime(FORMAT_TIME).in_time_zone <= EARLY_AFTERNOON &&
    @start.strftime(FORMAT_TIME).in_time_zone < LATE_MORNING ? end_morning : @end
  end

  def working_hour
    return 0 if working_end.nil? || working_start.nil?
    # non-half_dayoff or work include lunch must left 1h else calculate normaly
    if @status != "half day-off" || include_rest_hour?
      working_hour = ((working_end - working_start) / 3600 - 1).round(2)
    else
      working_hour = ((working_end - working_start) / 3600).round(2)
    end

    (working_hour.nil? || working_hour < 0) ? 0 : working_hour
  end

  def is_half_dayoff
    @start.strftime(FORMAT_TIME).in_time_zone >= LATE_MORNING || 
    (@end && (@end.strftime(FORMAT_TIME).in_time_zone <= EARLY_AFTERNOON ||
                working_hour <= 6))
  end

  private

  def include_rest_hour?
    working_start.strftime(FORMAT_TIME).in_time_zone <= END_MORNING &&
    working_end.strftime(FORMAT_TIME).in_time_zone >= START_AFTERNOON if working_end.present?
  end
end
class TimesheetService  
  def self.get_today_compensation_data
    compensation = Compensation.find_by(date: Date.today)
    if compensation.present?
      date = compensation.date
      for_date = compensation.for_date
      off_hour = Timesheet.find_by(date: for_date).off_hour.to_s
      { date: date,
        for_date: for_date,
        off_hour: off_hour
      }
    end
  end

  def self.update_compensation(today_timesheet)
    compensation = Compensation.find_by(date: today_timesheet.date, confirmation_status: "doing")
    if compensation.present?
      timesheet_for_date = Timesheet.find_by(date: compensation.for_date)
      if today_timesheet.odd_hour <= timesheet_for_date.off_hour
        compensation.update_attributes(confirmation_status: "failed")
      else
        compensation.update_attributes(confirmation_status: "success")
      end
    end
    compensation = Compensation.find_by(for_date: today_timesheet.date, confirmation_status: "waiting")
    if compensation.present? && today_timesheet.off_hour <= 0
      compensation.destroy
    end
  end
end

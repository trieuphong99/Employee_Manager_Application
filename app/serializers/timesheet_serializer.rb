class TimesheetSerializer < ActiveModel::Serializer
  attributes :id, :date, :start_at, :end_at, :status, :reason_in, :reason_out,
    :is_allowed, :is_paid, :time_work, :time_off, :compensate_to, :compensated_by, :compensation_status, :compensation_id

  def time_work
    object.working_hour
  end

  def time_off
    object.off_hour
  end

  def date
    object.date.strftime(FORMAT_DATE)
  end

  def start_at
    object.start_at.strftime(FORMAT_TIME)
  end

  def end_at
    object.end_at.strftime(FORMAT_TIME) if object.end_at.present?
  end

  def status
    object.status.split.map(&:capitalize).join(" ")
  end

  def compensate_to
    compensations = object.account.compensations.by_date(object.date)
    if compensations.first.present?
      @compensation_status = compensations.first.confirmation_status
      @compensation_id = compensations.first.id if compensations.first.waiting?
      compensations.first.for_date.strftime(FORMAT_DATE)
    end
  end

  def compensated_by
    compensations = object.account.compensations.by_for_date(object.date)
    if compensations.first.present?
      @compensation_status = compensations.first.confirmation_status
      @compensation_id = compensations.first.id if compensations.first.waiting?
      compensations.first.date.strftime(FORMAT_DATE)
    end
  end

  attr_reader :compensation_status, :compensation_id
end

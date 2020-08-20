class OvertimeSerializer < ActiveModel::Serializer
  attributes :id, :date, :start_at, :end_at, :reason, :confirmation_status

  def date
    object.date.strftime(FORMAT_DATE)
  end

  def start_at
    object.start_at.strftime(FORMAT_TIME)
  end

  def end_at
    object.end_at.strftime(FORMAT_TIME)
  end

  def confirmation_status
    object.confirmation_status.capitalize
  end
end

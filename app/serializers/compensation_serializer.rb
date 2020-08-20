class CompensationSerializer < ActiveModel::Serializer
  attributes :id, :date, :for_date, :confirmation_status, :start_at, :end_at

  def date
    object.date.strftime(FORMAT_DATE)
  end

  def for_date
    object.for_date.strftime(FORMAT_DATE)
  end

  def confirmation_status
    object.confirmation_status.capitalize
  end
end

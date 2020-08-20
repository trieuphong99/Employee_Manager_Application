class DayoffSerializer < ActiveModel::Serializer
  attributes :id, :request_date, :from_date, :to_date, :status, :reason, :confirmation_status,
  :is_paid, :account_id

  def request_date
    object.request_date.strftime(FORMAT_DATE)
  end

  def from_date
    object.from_date.strftime(FORMAT_DATE)
  end

  def to_date
    object.to_date.strftime(FORMAT_DATE)
  end

  def status
    object.status.split.map(&:capitalize).join(" ")
  end

  def confirmation_status
    object.confirmation_status.capitalize
  end
end

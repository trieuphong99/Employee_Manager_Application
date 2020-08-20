# frozen_string_literal: true

# validate
VALID_EMAIL_REGEX = /\A[\w+\-]+(\.[\w+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze
VALID_PHONE_REGEX = /(09|08|07|05|03)+([0-9]{8})\b/i.freeze

# format
WORK_STATUS = ["work", "full day-off", "half day-off", "long day-off"]
PAY_STATUS = %w(paid not_paid).freeze
DAYOFF_STATUS = ["full day-off", "half day-off", "long day-off"]
SEX = %w(male female).freeze
FORMAT_DATE = "%d/%m/%Y"
FORMAT_TIME = "%H:%M"
ROLE = %w(admin staff).freeze

# paginate
PER_PAGE = 8

# time
REST_TIME = 1
WORK_TIME = 8
BLOCK_TIME = 1
UTC_OFFSET = Time.zone.now.time_zone.utc_offset / 3600
START_TIME = "08:00:00".in_time_zone
END_TIME = "17:00:00".in_time_zone

LATE_MORNING = "10:00:00".in_time_zone
EARLY_AFTERNOON = "15:00:00".in_time_zone
END_MORNING = "12:00:00".in_time_zone
START_AFTERNOON = "13:00:00".in_time_zone

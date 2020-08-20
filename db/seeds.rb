# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' },
#                          { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Account.destroy_all
account = Account.create!(
  email: 'admin@gmail.com',
  password: '123456',
  joining_date: Date.today,
  position: 'developer',
  id_card: '123456789123',
  confirmed_at: DateTime.now
)
Account.first.create_profile!(
  name: "Nguyen Thanh Nam",
  phone_number: "0368897065",
  address: "Dong Ngac",
  sex: "male",
  date_of_birth: Date.today
)
Account.first.add_role :admin
account = Account.create!(
  email: 'staff@gmail.com',
  password: '123456',
  joining_date: Date.today,
  position: 'developer',
  id_card: '123456789124',
  confirmed_at: DateTime.now
)
Account.second.create_profile!(
  name: "Trieu Hai Phong",
  phone_number: "0961126705",
  address: "Lao Cai",
  sex: "male",
  date_of_birth: Date.today
)
Account.second.add_role :staff
(('2019-04-01'.to_date)..(Date.yesterday - 11.day)).each do |date|
  Account.second.timesheets.create!(
    date: date,
    start_at: date.beginning_of_day + rand((8.0)..(9.0)).round(2).hours,
    end_at: date.beginning_of_day + rand((16.5)..(17.5)).round(2).hours
  )
end
(('2019-04-01'.to_date)..(Date.yesterday - 6.day)).each do |date|
  Account.second.overtimes.new(
    date: date,
    start_at: date.beginning_of_day + rand((8.0)..(9.0)).round(2).hours,
    end_at: date.beginning_of_day + rand((16.5)..(17.5)).round(2).hours,
    reason: "Em đăng ký overtime cho dự án IMP",
    confirmation_status: ["confirmed", "rejected", "waiting"].sample
  ).save!(validate: false)
end
((Date.yesterday - 10.day)..(Date.yesterday - 8.day)).each do |date|
  Account.second.timesheets.create!(
    date: date,
    start_at: date.beginning_of_day + 8.hours,
    end_at: date.beginning_of_day + 16.hours
  )
end
((Date.yesterday - 7.day)..(Date.yesterday - 5.day)).each do |date|
  Account.second.timesheets.create!(
    date: date,
    start_at: date.beginning_of_day + 8.hours,
    end_at: date.beginning_of_day + 19.hours
  )
end
((Date.yesterday - 4.day)..(Date.yesterday - 1.day)).each do |date|
  Account.second.timesheets.create!(
    date: date,
    start_at: date.beginning_of_day + 8.hours,
    end_at: date.beginning_of_day + 16.hours
  )
end
Account.second.timesheets.create!(
  date: Date.yesterday,
  start_at: Date.yesterday.beginning_of_day + 8.hours,
  end_at: Date.yesterday.beginning_of_day + 21.hours
)
(('2019-04-01'.to_date)..(Date.yesterday - 3.day)).each do |request_date|
  Account.second.dayoffs.new(
    request_date: request_date,
    reason: "em co viec nha",
    from_date: request_date,
    to_date: request_date,
    status: ["full day-off", "half day-off"].sample,
    confirmation_status: ["confirmed", "rejected", "waiting"].sample
  ).save!(validate: false)
end
#compensation
Account.second.compensations.create!(
  date: Date.yesterday - 5.day,
  for_date: (Date.yesterday - 8.day).strftime(FORMAT_DATE)
)
Account.second.compensations.create!(
  date: Date.yesterday - 6.day,
  for_date: (Date.yesterday - 9.day).strftime(FORMAT_DATE),
  confirmation_status: "rejected"
)
Account.second.compensations.create!(
  date: Date.yesterday - 7.day,
  for_date: (Date.yesterday - 10.day).strftime(FORMAT_DATE),
  confirmation_status: "success"
)
(0..99).each do |n|
  account = Account.create!(
    email: "obito.test.#{n}@gmail.com",
    password: '123456',
    joining_date: Date.today,
    position: 'developer',
    id_card: "123456789#{n}",
    confirmed_at: DateTime.now
  )
  account.create_profile!(
    name: "Nguyen Duc Nam #{n}",
    phone_number: "036889700#{n}",
    address: "fasdfasdfasdf",
    sex: "male",
    date_of_birth: Date.today
  )
  account.add_role :staff
end

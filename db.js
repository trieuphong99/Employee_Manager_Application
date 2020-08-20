export default {
  "checkin": {
    "date": "05/02/2020",
    "start_at": "15:05:47"
  },
  "checkout": {
    "date": "05/02/2020",
    "end_at": "15:05:54"
  },
  "dayoff": {
    "data": [
      {
        "code": "B00001",
        "name": "Nhguyen Thanh Nam",
        "email": "ex@ex.com",
        "date": "01/01/2020",
        "reason": "dau dau",
        "status": "half day-off",
        "is_allowed": false,
        "is_paid": true
      },
      {
        "code": "B00002",
        "name": "Nhguyen Thanh Nam",
        "email": "ex@ex.com",
        "date": "01/01/2020",
        "reason": "Chia tay nguoi yeu",
        "status": "full day-off",
        "is_allowed": true,
        "is-paid": true
      },
      {
        "code": "B00003",
        "name": "Nhguyen Thanh Nam",
        "email": "ex@ex.com",
        "date": "01/01/2020",
        "reason": "Em bị đau chân, nó sưng nó tấy, đi phải chống gậy, hoa mắt chóng mặt đau đầu",
        "status": "half day-off",
        "is_allowed": false,
        "is_paid": false
      }
    ]
  },
  "overtime": {
    "data": [
      {
        "code": "B00001",
        "name": "Nhguyen Thanh Nam",
        "email": "ex@ex.com",
        "date": "01/01/2020",
        "start_at": "18:00",
        "end_at": "21:00",
        "is_allowed": false
      },
      {
        "code": "B00002",
        "name": "Nhguyen Thanh Nam",
        "email": "ex@ex.com",
        "date": "01/01/2020",
        "start_at": "18:00",
        "end_at": "21:00",
        "is_allowed": true
      },
      {
        "code": "B00003",
        "name": "Nhguyen Thanh Nam",
        "email": "ex@ex.com",
        "date": "01/01/2020",
        "start_at": "18:00",
        "end_at": "21:00",
        "is_allowed": false
      }
    ]
  },
  "currentusertimesheet": {
    "statistic": {
      "total_page": "66",
      "all": "100",
      "in_late": "50",
      "leave_early": "30",
      "in_late_and_leave_early": "15",
      "total_work": "1000",
      "total_off": "150",
      "total_offset": "50",
      "full_day_off_allowed_and_paid": "10",
      "full_day_off_has_allowed_no_paid": "10",
      "full_day_off_no_allowed": "5",
      "half_day_off_allowed_and_paid": "7",
      "half_day_off_has_allowed_no_paid": "15",
      "half_day_off_no_allowed": "20"
    },
    "data": [
    {
      "id": "1",
      "date": "01-01-2020",
      "start_at": "08:10",
      "end_at": "17:10",
      "time_work": "8",
      "time_off": "0",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "rejected",
      "report_id": "1"
    },
    {
      "id": "2",
      "date": "02-01-2020",
      "start_at": "08:00",
      "end_at": "19:00",
      "time_work": "10",
      "time_off": "0",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "waiting",
      "report_id": "2"
    },
    {
      "id": "3",
      "date": "03-01-2020",
      "start_at": "08:15",
      "end_at": "14:45",
      "time_work": "6.5",
      "time_off": "1.5",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "doing",
      "report_id": "3"
    },
    {
      "id": "4",
      "date": "03-01-2020",
      "start_at": "08:15",
      "end_at": "14:45",
      "time_work": "6.5",
      "time_off": "1.5",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "success",
      "report_id": "4"
    },
    {
      "id": "5",
      "date": "03-01-2020",
      "start_at": "08:15",
      "end_at": "14:45",
      "time_work": "6.5",
      "time_off": "1.5",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "failed",
      "report_id": "5"
    },
    {
      "id": "6",
      "date": "10-01-2020",
      "start_at": "08:15",
      "end_at": "14:45",
      "time_work": "10",
      "time_off": "0",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "",
      "report_id": "10"
    },
    {
      "id": "7",
      "date": "15-05-2020",
      "start_at": "08:15",
      "end_at": "14:45",
      "time_work": "6.5",
      "time_off": "0",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "waiting",
      "report_id": "10"
    },
    {
      "id": "8",
      "date": "15-05-2020",
      "start_at": "08:15",
      "end_at": "14:45",
      "time_work": "6.5",
      "time_off": "0",
      "status": "work",
      "note": "em tac duong",
      "is_allowed": true,
      "is_paid": true,
      "compensate_to": null,
      "compensated_by": null,
      "compensation_status": "",
      "report_id": "10"
    }
  ]
  },
  "usertimesheet": {
    "statistic": {
      "total_page": "66",
      "all": "100",
      "in_late": "50",
      "leave_early": "30",
      "in_late_and_leave_early": "15",
      "total_work": "1000",
      "total_off": "150",
      "total_offset": "50",
      "full_day_off_allowed_and_paid": "10",
      "full_day_off_has_allowed_no_paid": "10",
      "full_day_off_no_allowed": "5",
      "half_day_off_allowed_and_paid": "7",
      "half_day_off_has_allowed_no_paid": "15",
      "half_day_off_no_allowed": "20"
    },
    "data": [
      {
        "date": "01-01-2020",
        "start_at": "08:10",
        "end_at": "17:10",
        "time_work": "8",
        "time_off": "0",
        "status": "work",
        "is_allowed": true,
        "is_paid": true
      },
      {
        "date": "02-01-2020",
        "start_at": "08:00",
        "end_at": "19:00",
        "time_work": "10",
        "time_off": "0",
        "status": "work",
        "is_allowed": true,
        "is_paid": true
      },
      {
        "date": "03-01-2020",
        "start_at": "08:15",
        "end_at": "14:45",
        "time_work": "6.5",
        "time_off": "1.5",
        "status": "work",
        "is_allowed": true,
        "is_paid": true
      },
      {
        "date": "04-01-2020",
        "start_at": "8:10",
        "end_at": "12:10",
        "time_work": "4",
        "time_off": "0",
        "status": "half day-off",
        "is_allowed": true,
        "is_paid": true
      },
      {
        "date": "05-01-2020",
        "start_at": "",
        "end_at": "",
        "time_work": "0",
        "time_off": "0",
        "status": "full day-off",
        "is_allowed": true,
        "is_paid": true
      }
    ]
  },
  "users": [
    {
      "id": "11",
      "email": "duong98kk@gmail.com",
      "code": "B000023",
      "joining_date": "13-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Intern",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Đỗ Tùng Dương",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "23-2-1998",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "12",
      "email": "trung98@gmail.com",
      "code": "B000024",
      "joining_date": "12-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Developer",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Nguyễn Sỹ Trung",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "06-12-1998",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "13",
      "email": "duong98kk@gmail.com",
      "code": "B000023",
      "joining_date": "13-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Developer",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Tsunade",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "female",
        "date_of_birth": "14-2-1998",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "14",
      "email": "hinata2004@gmail.com",
      "code": "B000024",
      "joining_date": "12-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Intern",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Hinata",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "female",
        "date_of_birth": "12-3-2004",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "15",
      "email": "duong98kk@gmail.com",
      "code": "B000023",
      "joining_date": "13-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Intern",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Sakura",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "female",
        "date_of_birth": "01-3-2004",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "16",
      "email": "trung98@gmail.com",
      "code": "B000024",
      "joining_date": "12-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Intern",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Naruto",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "13-11-2004",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "17",
      "email": "duong98kk@gmail.com",
      "code": "B000023",
      "joining_date": "13-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Intern",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Sasuke",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "30-7-2004",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "18",
      "email": "trung98@gmail.com",
      "code": "B000024",
      "joining_date": "12-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Developer",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Kakashi",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "30-09-1995",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "19",
      "email": "duong98kk@gmail.com",
      "code": "B000023",
      "joining_date": "13-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Developer",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Gai",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "14-12-1998",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "20",
      "email": "trung98@gmail.com",
      "code": "B000024",
      "joining_date": "12-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Developer",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Orochimaru",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "13-6-1994",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "21",
      "email": "duong98kk@gmail.com",
      "code": "B000023",
      "joining_date": "13-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Intern",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Itachi",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "05-7-1994",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
    {
      "id": "22",
      "email": "trung98@gmail.com",
      "code": "B000024",
      "joining_date": "12-9-2019",
      "id_card": "123456789",
      "official_date": "23-02-2020",
      "contract_type": "Part-Time",
      "position": "Intern",
      "status": true,
      "profile": {
        "id": "11",
        "name": "Nagato",
        "phone_number": "+84969374623",
        "address": "Quốc Oai-Hà Nội-Việt Nam",
        "sex": "male",
        "date_of_birth": "03-8-1994",
      },
      "roles": [{
        "id": 1, "name": "admin"
      }]
    },
  ],
  "reportInlateLeaveEarly": [
    {
      "date": "01/04/2020",
      "reason": "123123",
      "type": "In Late",
      "time": 0,
      "id": 1
    },
    {
      "date": "14:57:27 05/02/2020",
      "reason": "",
      "id": 2
    },
    {
      "date": "15:05:47 05/02/2020",
      "reason": "",
      "id": 3
    },
    {
      "date": "15:05:54 05/02/2020",
      "reason": "",
      "id": 4
    }
  ],
  "currentuserdayoff": {
    "listDayoff": [
      {
        "date": "02/01/2020",
        "reason": "Đau tay",
        "status": "half day-off",
        "is_allowed": false,
        "is_paid": true
      },
      {
        "date": "02/01/2020",
        "reason": "Đau đầu",
        "status": "full day-off",
        "is_allowed": true,
        "is_paid": false
      },
      {
        "date": "02/01/2020",
        "reason": "Đau chân",
        "status": "half day-off",
        "is_allowed": false,
        "is_paid": false
      }
    ]
  },
  "currentuserovertime": {
    "listOvertimes": [
      {
        "date": "01/01/2020",
        "start_at": "18:00",
        "end_at": "21:00",
        "is_allowed": "waiting"
      },
      {
        "date": "01/02/2020",
        "start_at": "17:40",
        "end_at": "20:00",
        "is_allowed": "refuse"
      },
      {
        "date": "12/01/2020",
        "start_at": "15:10",
        "end_at": "21:00",
        "is_allowed": "confirm"
      }
    ]
  }
}
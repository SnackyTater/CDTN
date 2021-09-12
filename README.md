# CDTN
name: cosmitto
description: tinder-clone, dùng cho chuyên đề tốt nghiệp 2020-2021

# link heroku: https://cosmitto.herokuapp.com/

# các API đã hoạt động (không cần update thêm trừ khi yêu cầu thay đổi)
- "/api/signup" (05/09/2021)                (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)
- "/api/login" (05/09/2021)                 (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)
- "/api/profile/:id" (07/09/2021)           (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)
- "/api/profile/update/:id" (07/09/2021)    (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)
- "/api/profile/delete/:id" (07/09/2021)    (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)
- "/api/recs" (10/09/2021)                  (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)
- "/api/like" (12/09/2021)                  (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)
- "/api/nope" (12/09/2021)                  (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)

# các API chưa hoàn thiện 
- "/api/block"
- "/api/tag" (get, post, put, delete)

# todo
- upload image lên cloud
- chat app
- recommendation system (dựa theo giới tính, khu vực, không được trong danh sách nope && block, tag(optional))  DONE!
- các chức năng cho admin
- làm script tạo dummy data
- SMS OTP cho điện thoại (optional - nếu làm được và k mất $$)
- verify account = google mail
- stringee video call (optional)

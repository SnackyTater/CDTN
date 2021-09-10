# CDTN
name: cosmitto
description: tinder-clone, dùng cho chuyên đề tốt nghiệp 2020-2021
link heroku: https://cosmitto.herokuapp.com/

# cho front-end(Q.Anh)
- B1: npm run install-client (chỉ cần chạy 1 lần khi mới clone app về)
- B2: npm run client

# các API đã hoạt động (không cần update thêm trừ khi yêu cầu thay đổi)
- "/api/signup" (05/09/2021)
- "/api/login" (05/09/2021)
- "/api/profile/:id" (07/09/2021)
- "/api/profile/update/:id" (07/09/2021)
- "/api/profile/delete/:id" (07/09/2021)
- "/api/recs" (10/09/2021) (đã đủ được yêu cầu cơ bản & chưa phát sinh lỗi)

# các API chưa hoàn thiện 
- "/api/swipe-left"
- "/api/swipe-right"
- "/api/block"
- "/api/tag" (get, post, put, delete)

# todo
- upload image lên cloud
- chat app
- recommendation system (dựa theo giới tính, khu vực, không được trong danh sách nope && block, tag(optional))
- các chức năng cho admin
- làm script tạo dummy data
- SMS OTP cho điện thoại (optional - nếu làm được và k mất $$)
- verify account = google mail

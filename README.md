# CDTN
name: cosmitto
description: tinder-clone, dùng cho chuyên đề tốt nghiệp 2020-2021

# link heroku: https://cosmitto.herokuapp.com/

# các API đã hoạt động (không cần update thêm trừ khi yêu cầu thay đổi)
- "/api/login"                  (05/09/2021)
- "/api/profile/:id"            (07/09/2021)
- "/api/profile/update/:id"     (07/09/2021)
- "/api/profile/delete/:id"     (07/09/2021)
- "/api/recs"                   (10/09/2021)
- "/api/like"                   (12/09/2021)
- "/api/nope"                   (12/09/2021)
- "api/profile/image"           (15/09/2021)
- "/api/signup"                 (15/09/2021)

# các API đã hoàn thành nhưng lỗi || chưa test
- "/api/block"
- "/api/tag" (get, post, put, delete)

# các API chưa hoàn thiện 

# frontend (component đã hoàn thiện nhưng còn vấn đề)
- landing page (80%, chưa responsive cho mobile)
- login form (50%, chưa responvie cho mobile & resize màn hình)

# frontend chưa hoàn thiện
- register form
- forgot password
- home (admin, normal user)
- profile

# todo
- Làm front-end (tiến độ: 0.01%)
- REFRACTOR KHI LÀM XONG CƠ BẢN (cả DB nếu cần)                                                                 DONE!
- upload image lên cloud                                                                                        DONE!
- chat app
- recommendation system (dựa theo giới tính, khu vực, không được trong danh sách nope && block, tag(optional))  DONE!
- các chức năng cho admin                                                                                       DONE!
- làm script tạo dummy data
- SMS OTP cho điện thoại (optional - nếu làm được và k mất $$)
- verify account = google mail                                                                                  DONE!
- stringee video call (optional)

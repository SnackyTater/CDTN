# CDTN
name: cosmitto
description: tinder-clone, dùng cho chuyên đề tốt nghiệp 2020-2021

# link heroku: https://cosmitto.herokuapp.com/

# các API đã hoạt động (không cần update thêm trừ khi yêu cầu thay đổi)
- "/account"                        (get)
- "/account"                        (post)
- "/account"                        (put)
- "/account"                        (delete)
- "/account/login"                  (post)
- "/account/email-verificate"       (post)
- "/account/reset-password"         (post)
- "/account/reset-password/:id"     (post)
- "/user"                           (get)
- "/user"                           (put)
- "/passion"                        (get)
- "/media"                          (post)
- "/media/:id"                      (delete)
- "/matchMaking/recs"               (get)
- "/matchMaking/like"               (post)
- "/matchMaking/nope"               (post)
- "/matchMaking/un-match"           (post)
- "/matchMaking/get-matches"        (get)
- "/chat"                           (get)
- "/chat/:id"                       (get)


# todo
- làm script tạo dummy data

todo: sửa sidebar ở profile + chat, range slider ở config, cho lại function vào like + nope, 
# CDTN
name: cosmitto
description: tinder-clone

# use
- front-end: 
    + reactJS
    + SASS
    + socket.io-client (for chat)
    + axios (fetching data)
- back-end: express, mongoose, socket-io
    + express
    + mongoose
    + socket.io
    + nodemailer (sending email)
    + cloudinary & multer (receiving & saving image from front-end)
    + jsonwebtoken || JWT

# heroku: https://cosmitto.herokuapp.com/

# API list
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
- create script for creating dummy data
- use webpack to bundle & create dev server for react
- use gulp for automate task 
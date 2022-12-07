const { request, response } = require("express");
const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const saltRounds = 10;

UsersRouter.route("/login").post(async (request, response) => {
    // username and password are required
    const username = request.body.username;
    const password = request.body.password;
    db.user
      .findOne({ where: { username: username } })
      .then(async (user) => {
        if (user) {
          bcrypt.compare(password, user.password, (error, same) => {
            if (same) {
              request.session.userId = user.id; 
              response.redirect("/");
            } else {
              response.redirect("/login");
            }
          });
        }
      })
      .catch((error) => {
        console.log("this fired", error);
        response.send(error);
      });
  });

UsersRouter.route("/signUp").post(async (request, response) => {
  const password = request.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  // email, password, username
  const email = request.body.email;
  const username = request.body.username;
//   console.log(encryptedPassword)
  db.user
    .create({ email: email[0], password: encryptedPassword, username: username })
      //response.send(user) // changed in chapter 7.2
      .then((user) => {
        //response.send(user) // changed in chapter 7.2
        response.redirect("/login");
      })
      .catch((err) => {
        err;
      });
  });

module.exports = UsersRouter;

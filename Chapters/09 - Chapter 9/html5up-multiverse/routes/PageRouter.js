const express = require("express");
const PageRouter = express.Router();
const db = require("../models");
const app2= express.Router()

PageRouter.get("/", (request, response) => {
  if (request.session.userId) {
    db.photo
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES"); 
        response.render("index", { "data":photos });
      })
      .catch((error) => {
        response.send(error);
      });
      
  } else {
    response.redirect("/login");
  }
});
PageRouter.get("/photo", (request, response) => {
  console.log(request.session.userId);
  if (request.session.userId) {
    response.render("photo");
  } else {
    response.redirect("/login");
  }
});
PageRouter.get("/login", (request, response) => {
  console.log("/LOGGING IN!");
  response.render("login");
});
PageRouter.get("/signUp", (request, response) => {
  console.log("/signUp");
  response.render("signUp");
});
PageRouter.get("/logout", (request, response) => {
  console.log("logging out");
  request.session.destroy(() => {
    response.redirect("/login");
  });
});

module.exports = PageRouter;

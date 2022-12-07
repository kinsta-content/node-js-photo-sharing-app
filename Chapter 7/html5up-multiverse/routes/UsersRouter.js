const { request, response } = require("express");
const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json());

UsersRouter.route('/login')
.post((request, response)=>{
    const password = request.body.password
    const username = request.body.username
    db.user.findOne({where:{username: username, password: password}}).then(user=>{
        response.redirect('/')
    }).catch(err=>{
        response.send('You don\'t have an account. Try signing up!')
    })
})

UsersRouter.route('/signUp')
.post((request, response)=>{
    // email, password, username
    const email = request.body.email
    const password = request.body.password
    const username = request.body.username

    db.user.create({email: email, password: password, username: username}).then(user=>{
    //   response.send(user)
    response.redirect('/login');
    }).catch(err=>{
        err
    })
})

module.exports = UsersRouter;
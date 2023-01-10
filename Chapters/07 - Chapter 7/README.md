# 7.1 Creating Signup Pages and Routes

Let's create our signup and login routes!

Inside of server.js we will also want to let it know where to find these new routes (fourth ones down):

```js
//routes
const PhotosRouter = require('./routes/PhotosRouter')
const CommentsRouter = require('./routes/CommentsRouter')
const UsersRouter = require('./routes/UsersRouter')
const PageRouter = require('./routes/PageRouter') // < add this line
app.use('/images', PhotosRouter)
app.use('/comments', CommentsRouter)
app.use('/users', UsersRouter)
app.use('/', PageRouter) //< and this line
```

These will require a little refactoring. Currently we don't have a route in the `routes` directory that handles add photo or the home page. They are located at the bottom of our server.js file. We will want to cut them from that page and move them into a new file called `PageRouter.js` in the `/routes/` directory.

In our `PageRouter.js` file, we want to allow connections to /signup and /login. Let's create the file then add those.

Paste in your routes _from_ `server.js` located at the bottom of the file for `/` and `/photo`

It should look like this:

```js
const express = require("express");
const PageRouter = express.Router();
const db = require("../models");

PageRouter.get("/", (req, res) => {
  res.render("index");
});
PageRouter.get("/photo", (request, response) => {
  console.log("/photo");
  response.render("photo");
});

module.exports = PageRouter;
```

Go ahead and pause the video. 

See if you can add the routes for GET requests to our `login` and `signup` pages by yourself. 

```js
PageRouter.get("/login", (request, response) => {
  console.log("/LOGGING IN!");
  response.render("login");
});
PageRouter.get("/signUp", (request, response) => {
  console.log("/signUp");
  response.render("signUp");
});

```
----

# 7.2 Creating our EJS SignUp Page

In our `views` directory, create a new file called `login.ejs` and another called `signUp.ejs`.

Let's start with `signUp.ejs`. One thing to note is that the content-type will be `Content-Type="multipart/form-data"`. We need to pass to the API endpoints our `username`, `password`, and `email address` to sign up.

```js
<%- include('partials/header'); %>
  <%- include('partials/navbar'); %>
</body>
  <!-- Main -->
  <div class="container">
    <h1>Sign up</h1>
    <form action="/users/signUp" method="POST" enctype="application/json">
      <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username" required/>
        </div>
        <br />
        <div class="form-group floating-label-form-group controls">
          <label for="email">email</label>
          <input type="email" class="form-control" id="email" name="email" required/>
        </div>
        <br />
        <div class="form-group floating-label-form-group controls">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" required/>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class btn btn-primary id="sendMessaageButton">
            Signup
          </button>
        </div>
  </div>

<%-include('partials/footer'); %>
```

Lastly, after signing up, we want to be redirected, not shown JSON output. Let's correct that now.

In our `UsersRouter.js` file, let's make 1 change (9th line below):

```js
UsersRouter.route('/signUp')
.post((request, response)=>{
    // email, password, username
    const email = request.body.email
    const password = request.body.password
    const username = request.body.username

    db.user.create({email: email, password: password, username: username}).then(user=>{
      //response.send(user) // changed in chapter 7.2
      response.redirect('/login');
    }).catch(err=>{
        err
    })
})
```

If we test this out, we should be redirected to a blank page, this is because we haven't created our `Login.ejs` code. That's next!

---

# 7.3 Login Page

`Login.ejs` will be very similar to `signUp.ejs`. Let's take a look. Paste this code into `login.ejs`.

```js
<%- include('partials/header'); %>
  <%- include('partials/navbar'); %>
</body>
  <!-- Main -->
  <div class="container">
    <h1>Log in</h1>
    <form action="/users/login" method="POST" enctype="application/json">
      <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username" required/>
        </div>
        <br />
        <div class="form-group floating-label-form-group controls">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" required/>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class btn btn-primary id="sendMessaageButton">
            login
          </button>
        </div>
  </div>

<%-include('partials/footer'); %>
```
After login, we will want to redirect users to the home page.  Let's do that now.

In the `UsersRouter.js` file, let's see if you can set it all by yourself! You got this.


---

# 7.4 Special note on dumping the database

On our `server.js` file, let's dump all tables by updating the sync() function. Edit this line of code. It should be line 21 if you have followed along perfectly. Right after `db.sequalize`.

```js
.sync({force:true})
```

This is great for troubleshooting and testing, we will want to revert this after our application is done. We will turn it off in Chapter 11.

---

# 7.5 Summary

We have now created all the missing pages and really nailed down our understanding of routes. Let's move on to encrypting our passwords for logins and signups. I'll see you in the next Chapter.

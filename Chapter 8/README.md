# 8.1 Encrypting our passwords

So we now have a working UI for adding photos, signing up and logging in. But before storing user passwords in the database in real life, we need to encrypt it first. This way, if our database is ever compromised the original passwords are not visible.

To do this, we can use the `bcryptjs` module.

```bash
npm install bcryptjs
```

Let's edit our signUp Post route in our `UsersRouter.js` file to enable encryption of the password.

```js
const bcrypt = require("bcryptjs");
const saltRounds = 10;
```

With “salt round” they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult it is some someon to figure out a password with a brute-force attack. We are going with 10, while it's larger than probably necessary for such a small application, it isn't big enough to cause any noticeable lag.  Feel free to up it if you like.

An important note is that this will have zero effect on anything already stored in the database. Let's edit our signup route with `bcrypt`.

```js
UsersRouter.route("/signUp").post(async (request, response) => {
  const password = request.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const email = request.body.email;
  const username = request.body.username;

  db.user
    .create({ email: email[0], password: encryptedPassword, username: username })
    .then((user) => {
      //response.send(user) // changed in chapter 7.2
      response.redirect("/login");
    })
    .catch((err) => {
      err;
    });
});
```

Test it out to make sure it still works.


We don't wan't that password appearing in console output so we need to make a change to our model.

Head over to `models/UsersModel.js`. Add this code below the `password` block (around line 13, your new line should be line 15).

```js
 password: {
 type: DataTypes.STRING,
 `select: false`. // < your new line
 },
 ```
Now let's create the login to make sure it validates the encrypted password:

```js
UsersRouter.route("/login").post(async (request, response) => {
  // username and password are required
  console.log(request.body)
  const username = request.body.username;
  const password = request.body.password;
  db.user
    .findOne({ where: { username: username } })
    .then(async (user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            console.log(user.id)
            console.log("logged in")
            response.redirect("/");
          } else {
            response.redirect("/login");
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.send(error);
    });
});
```

Again, let's test it to make sure it works.

---

# 8.2 User Authentication with Express Sessions

Sessions are how we keep the user logged into our web app by keeping their information in the browser. Each time the user makes a request, information for that user is sent back to the server. The server will know which user is making that request and their logged in state. This information on their logged in status is called cookies. Cookies are sent as header values in each request.

While the code from the previous chapter does check the user's credentials, it does not persist through the login. That can be achieved using sessions or cookies. In this example, we would make use of sessions.

First, we install the `express-session` module from npm.

```bash
npm install express-session
```

Let's require it in `server.js`. Add this with the other 'const' lines:

```js
const expressSession = require("express-session");
```

Now let's add the cookie to our login redirect. We need to initialize our `expressSession middleware` in our application and then pass in an object with a secret value. You can of course create your own string.  This secret string is used to sign and encrypt the session ID cookie being shared with the browser.

Add this code to `server.js'

```js
app.use(expressSession({
    secret: 'Drew Loves Kinsta'
}))
```
In this example, an `userId` property is defined when login is successful and this can be used when checking if a user is logged in.

We can then go to our application in the browser and see the cookie in action.

Before:

![https://p289.p2.n0.cdn.getcloudapp.com/items/ApuD2XOl/9479ed98-2a8e-49fb-ae7b-1637ae4a80b4.jpg?v=409ba1930cea326d42e23c3af8380e67](https://p289.p2.n0.cdn.getcloudapp.com/items/ApuD2XOl/9479ed98-2a8e-49fb-ae7b-1637ae4a80b4.jpg?v=409ba1930cea326d42e23c3af8380e67)

Save the file.

![https://p289.p2.n0.cdn.getcloudapp.com/items/Jru89o7B/7f1f9793-641c-46f2-89a3-8867cbb7a156.jpg?v=07768fb1f7bd05f9eb519167e32641e5](https://p289.p2.n0.cdn.getcloudapp.com/items/Jru89o7B/7f1f9793-641c-46f2-89a3-8867cbb7a156.jpg?v=07768fb1f7bd05f9eb519167e32641e5)
---

# 8.3 Implementing User Sessions

To implement the user session, in `UsersRouter.js` add the following line:

```js
UsersRouter.route("/login").post(async (request, response) => {
  // username and password are required
  const username = request.body.username;
  const password = request.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  db.user
    .findOne({ where: { username: username } })
    .then(async (user) => {
      if (user) {
        await bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            // console.log(user.id)
            request.session.userId = user.id; // THIS LINE HERE!!!!!!!!!
            console.log(request.session)
            console.log("logged in")
            response.redirect("/");
          } else {
            console.log("this fired")
            response.redirect("/login");
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.send(error);
    });
});
```

To implement checking for a session id before allowing a user to add a photo, in our `PageRouter.js` we need to add a new line.

```js
PageRouter.get("/", (request, response) => {
  console.log(request.session.userId)
  if (request.session.userId){
    response.render("index");
  }
  else{
    response.redirect('/login')
  }
});

PageRouter.get("/photo", (request, response) => {
  console.log(request.session.userId)
  if (request.session.userId){
    response.render("photo");
  }
  else{
    response.redirect('/login')
  }
});
```

---

# 8.4 Conditionally display Add photo, login, signup links

The following code will ensure that when we call an if statement looking to see if a user is logged in or not, we can easily in EJS. Place this in your `server.js file` below the the 'expressSession, secret' block we did in 8.2.

```js
global.loggiedIn = null;
app.use("*", (request, response, next) => {
  loggedIn = request.session.userId;
  next();
});
```
In your `/partials/navbar.ejs` file find the login links and the signup link and insert the following EJS code:

```js
<% if(loggedIn){ %>
  li class="nav-item"
  ...
  </li>
<% } %>
```

it should look like this when it's completed:

```js
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Kinsta</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <% if(loggedIn){ %>
        <li class="nav-item">
          <li class="nav-item">
          <a class="nav-link" href="/photo">Add Photo</a>
        </li>
        <% } %> 
        <% if(!loggedIn){ %>
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <% } %> 
        <% if(loggedIn){ %>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Logout</a>
        </li>
        <% } %> 
        <% if(!loggedIn){ %>
        <li class="nav-item">
          <a class="nav-link" href="/signUp">Signup</a>
        </li>
        <% } %>
      </ul>
    </div>
  </div>
</nav>
```

---

# 8.5 Logging out

Currently, if you click the logout link, you get a `Cannot GET /logout` response. This isn't desirable. Since our login status is determined by a cookie, all we have to do is delete the cookie.

Easier said than done right?

Let's look at how to delete the user session.

In our `PageRouter.js` file - add the following code:

```js
PageRouter.get("/logout", (request, response) => {
  console.log("logging out");
  request.session.destroy(() => {
    response.redirect("/login");
  });
});
```

Way easier than you thought huh?

---

# 8.6 Summary

Everything user login related can be really hard if you don't know what you are doing. This was a seriously hard chapter to create - getting it right so that you have a foundational understanding was paramount for me when creating this course.

We have learned a ton in this chapter so lets recap.

The first thing we did was ensure that users logging in were storing their passwords securely. They could then login securely by leveraging `bcrypts` compare feature. we put all that together and created some EJS logic to enable our links to only show up when a user was logged in. Speaking of, we learned how to make a user stay logged in using `express-sessions` and then how to destroy that cookie we created in order to log out.

You're doing great, keep it up! I'll see you in the next chapter where we learn about how to connect comments to a user.

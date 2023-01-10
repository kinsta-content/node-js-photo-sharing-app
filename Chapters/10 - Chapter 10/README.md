# 10.1 Preparing our Application for production

Up to this point, we have reached all our goals. The application works as written, but there are a few missing pieces.

For starters, there is no good error handling in our application. There isn't good logging for bad login attempts. In fact there isn't very good logging at all

Right now if you were to deploy the application then make a change, it would lose all the user data previously input, and we don't want that!

Another shortcoming is if you login with a bad password, it just times out. This isn't a great user experience.

Let's fix these problems in this chapter.

---

# 10.2 Error handling

Right now if we try to log in with the wrong credentials, we get a time out. Let's fix this. Head over to routes/UsersRouter.js and edit the file with an additional else statment that says "if there is no user, respond in kind"

```js
        if (user) {
          bcrypt.compare(password, user.password, (error, same) => {
            if (same) {
              request.session.userId = user.id; 
              response.redirect("/");
            } else {
                response.status(401)
                console.log("401 error")
                response.render("/badlogin")
          });
        }
        else { // this line
          response.send("No Such user") // this line
        }
```

So now we are sending a response status and we are logging it but there is no way to tell what was the problem from the frontend so we have to create the route for /badlogin.

In our PageRouter.js, let's create a new route called "badlogin" that renders the login page. Now the way we are going to do things, we have to pass data to the ejs template and since we load the login page with or without data we have to pass data to the regular login as well. Let me show you what I mean:

```js
PageRouter.get("/login", (request, response) => {
  console.log("/LOGGING IN!");
  response.render("login", {data: ""});
});
PageRouter.get("/badlogin", (request, response) => {
  console.log("/LOGGING IN!");
  response.render("login", {data: "Bad Login Credentials"});
})
```

Now all we have to do is add the following code to our login.ejs inside the container:

```js
    <% if (data) { %>
     <%= "Wrong Credentials" %>
   <% } %>
```
---

# 10.3 Adding additional logging with Morgan

Let's add some additional logging to our application so that we can see all the requests being made on the frontend:

```bash
npm install morgan
```

Now let's require it in our server.js

```
const logger = require("morgan");
app.use(logger("dev"));
```

---

# 10.4 Answering 404 calls

In our PageRouter.js file, we need to handle requests that aren't explicitly called out with a simple trick. 

The last route in the list should be like the following:

```js
PageRouter.get("/*", (request, response) => {
  console.log("404");
  response.send("404");
});
```

If you made this the first item on the list, express would pick it up first and not check any other routes.

Let's create a 404 page that renders instead of an error page for a little more graceful failure. In /views directory, add a file called 404.ejs.

```js
<%- include('partials/header'); %>
  <%- include('partials/navbar'); %>
  <div class="container">
    <h1>404 Error, the requested resource was not found.</h1>
  </div>
  <%- include('partials/footer'); %>
```

Now edit the PageRouter to render the 404.ejs page:

```js
PageRouter.get("/*", (request, response) => {
  console.log("404");
  response.render("404"); // this line
});
```

---

# 10.5 Sanitizing Files

Currently, if you were to take a shell script and change it's extention to .png for example, then you could actually upload it to our site. For obvious reasons, we do not want this. 

Multer only filters based on file extension and many other mime type checkers are easily fooled. To keep our application safe from unwanted file types, we are going to want to delete bad files from being stored in our file system.

In our `PageRouter.js` on the get request to the `/` path, we will want to automatically clean up all bad files. Since this code is a bit more advanced, you can copy it from Appendix 2 which is linked below this video.

Before moving on, we want to delete all images and directories inside of /public/images/.

---

# 10.6 Preventing overwrite and creating our NPM start command

On our server.js file, we currently have a line that reads `.sync({force:true})` we need it to only alter tables instead of wiping them out everytime the server is restarted, let's remove the `{force:true}`.

In our Package.json file, let's add a new script for production use:

In package.json add a new line that should look like this:

```json
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
```

This enables the command `npm start` to work for production servers.

---

# 10.7 Summary

We have completed building our local application that shows uploaded photos, allows for comments, and handles user login or signup. It looks pretty good considering how little HTML/CSS we have had to add (thanks to the Multiverse HTML-5UP theme. 

There is just one thing missing at this point. It's all local and we cannot share our work with our friends and family who would enjoy sharing and commenting on photos.

After these finishing touches, our application is ready for the public internet. In our next video we will learn how easy it is to deploy our code to Kinsta's application hosting. I'll see you there.
# 6.1 Middleware

Middleware in Express.js applications are functions that have access to the request object (`req`), the response object (`res`). These functions can:

-   Execute any code
-   Make changes to the request and the response objects
-   End the request-response cycle
-   Call the next middleware function in the stack

There are a few types on middleware namely:

-   Application-level middleware
-   Router-level middleware
-   Error-handling middleware
-   Built-in middleware
-   Third-party middleware

---

# 6.2 Application-Level Middleware

This is bound to an instance of the [`app`](../Chapter%202/What%20is%20express.md) object. Here is an **example**.

```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});
```

In the following example a mount path or route is specified. The path specifies the routes the middleware acts on.

```js
app.use("/user/:id", (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
});
```

---

# 6.3 Router-Level Middleware

This functions exactly the same as application-level middleware, except it is bound to an instance of `express.Router()`.

```js
const express = require("express");
const app = express();
const router = express.Router();

router.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});
```

Now specifying a path

```js
router.use("/user/:id", (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
});
```

---

# 6.4 Error-Handling Middleware

As the name suggests, this middleware is used for error handling and is identical to the others except it takes four arguments instead of three (`err`, `req`, `res`, `next`):

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
```

---

# 6.5 Built-in Middleware

Express has the following built-in middleware functions:

-   `express.static` serves static assets such as HTML files, images, and so on
-   `express.json` parses incoming requests with JSON payloads
-   `express.urlencoded` parses incoming requests with URL-encoded payload

---

# 6.6 Third-party middleware

Use third-party middleware to add functionality to Express apps.

The following **_example_** illustrates installing and loading the cookie-parsing middleware function `cookie-parser`. NOTE: Don't actually run this command on your project, this is just an example.

```bash
npm install cookie-parser #WE AREN'T DOING THIS
```

```js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// bind the cookie-parsing middleware to the app object
app.use(cookieParser());
```

Reference:

-   [Express docs](https://expressjs.com/en/guide/using-middleware.html)

---

# 6.7 Validation Middleware

Express middleware can be used used to validate a request and return a response with errors; if any of the configured validation rules fail. `express-validation` is a library that does just this.

You would install this with npm run the following command. NOTE: We _aren't_ doing this for this course.

```bash
npm install express-validation #WE AREN'T DOING THIS
```

Below is an example application that uses the middleware to ensure that a valid `email` and `password` are submitted.

```js
const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validation");

const app = express();
app.use(bodyParser.json());

app.post(
    "/login",
    // email must be a valid email
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
    (req, res) => {
        // Finds the validation errors in this request and send with a 400 status code
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.json(200);
    }
);

app.listen(3000);
```

References

-   [https://github.com/andrewkeig/express-validation](https://github.com/andrewkeig/express-validation)

---

# 6.8 Custom Middleware

All middleware functions in Express.js accept three arguments following the request (`req`), response (`res`), and (`next`) lifecycle methods.

Our custom middleware is simply a function that accepts thes three arguments.

```js
...

function myCustomMiddleware(req, res, next) {
  ...
}

...
app.use(myCustomMiddleware);
```

---

# 6.9 Saving Uploads to Our Database

### Handling File Uploads in Express

To handle file uploads in express we use the `Multer` library. From their readme "Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form."

Let's install it in our project, yes, we're actually doing this one :)

```bash
npm install multer
```

In our `server.js` file, let's add some code to create routes that will serve like an API. These routes will be `/comments`, `/users`, & `/images`.

```js
app.use('/images', PhotosRouter)
app.use('/comments', CommentsRouter)
app.use('/users', UsersRouter)
```

Don't forget, we have to create the routers above

- Create a directory called `routes`
- And then create 3 files inside our routes directory called `PhotosRouter.js`, `CommentsRouter.js`, and `UsersRouter.js`
- Then require them in `server.js`.
- Make sure to put this above the app.use code we wrote just before, otherwise you will get errors. The code will look like this:

```js 
//server.js
const PhotosRouter = require('./routes/PhotosRouter')
const CommentsRouter = require('./routes/CommentsRouter')
const UsersRouter = require('./routes/UsersRouter')
```

---

# 6.10 Setting Up Our Photos Route

In our PhotosRoute.js file, let's code our CRUD routes that will allow us to create, read, update, and delete photos. 

First let's require Express, our models, and Multer:

```js
const express = require("express");
const PhotosRouter = express.Router();
const db = require("../models");
const multer = require("multer");
```

One thing to note is we will call the router `PhotosRouter` instead of app like we did in `server.js`. 

To store images, we need to tell Multer where to store them - this code comes from the Multer docs in case you are wondering.

[Mutler npm page - https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer) 

We specify the destination as `./public/images` so that we can serve static assets. We also set the filename to be unique by adding a `Date.now()` to the file name - this will help avoid collisions in our database. We also don't want to allow uploads that do not meet our criteria - so we set it up to reject files that are not common image types.

Paste this code into `PhotosRouter.js`

```js
const fileStorageEngine = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/images");
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});
const uploadFilter = function (request, file, callback) {
    
    const fileType = file.mimetype.split('/');
    
    if (fileType[0] === "image") {
      callback(null, true)
    }else{
      callback("You are trying to upload a file that is not an image. Go back and try again", false)
    }
};

const upload = multer({ 
  fileFilter: uploadFilter,
  storage: fileStorageEngine
});
```

Let's call our PhotosRouter object and add our rout to it.

The only route we will add it is `/` because that route can accept various types of requests - `GET`, `POST`, `PUT`, and `DELETE`. These types of requests align with CRUD. 

The first one we will conquer is `.get`

```js
PhotosRouter.route("/")
  .get((request, response) => {
    db.photo
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES");
        response.redirect('/');
      })
      .catch((error) => {
        response.send(error);
      });
  })
```

Now we want to be able to upload photos, so let's create our POST route. To upload a photo, we have to pass a title and an image and it must be of a specific file type, let's see what this code would look like:
```js
PhotosRouter.route("/")
  .post(upload.single("photo"), (request, response) => {
    const title = request.body.title;
    const mediaLocation = request.file.filename;
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== "jpeg") {
      response.send("Only photos are allowed, press go back to try again")
    }else{
    db.photo
      .create({ title: title, mediaLocation: mediaLocation })
      .then((photo) => {
        console.log("POST IMAGES");
        response.send(photo);
      })
      .catch((error) => {
        response.send(error);
      });
  }})
```
We won't be creating PUT or delete paths that work but we will log them to our console. Consider it optional. In any case, if you are up to the challenge, go ahead and try to create working routes for put and delete methods. Here is some code that should help:

NOTE: this code is optional. Only try this if you want to add the ability to delete photos.

```js
// WE AREN'T DOING THIS AS PART OF THE COURSE:

  .put((request, response) => {
    console.log("PUT IMAGES");
    response.send("PUT IMAGES");
  })
  .delete((request, response) => {
    console.log("DELETE IMAGES");
    response.send("DELETE IMAGES");
  });

PhotosRouter.route("/:id") // for removing photos
  .delete((request, response) => {
    const id = request.params.id;
    db.photo
      .destroy({ where: { id: id } })
      .then((photo) => {
        response.send("Deleted");
      })
      .catch((error) => {
        response.send(error);
      });
  });
```

Lastly, we need to export our `PhotosRouter` so that server.js can utilize this code. 

```js
module.exports = PhotosRouter;
```

Let's create our UsersRouter.js file now, there isn't a whole lot beyond the routes to figure out on this one currently and it will be very similar to our comments.js file. The main point I'd like to drive home here, this is only for testing purposes, we aren't hashing or encrypting any of these details so we will have to revisit this later when we cover the validation middleware chapter.

```js
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
        response.send(user)
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
      response.send(user)
    }).catch(err=>{
        err
    })
})

module.exports = UsersRouter;
```

Let's create `CommentsRouter.js` file now:

```js
const express = require("express");
const CommentsRouter = express.Router();
const db = require("../models");

CommentsRouter.route('/')
.post((request, response)=>{
    const userId = request.body.userId;
    const photoId = request.body.photoId;
    const content = request.body.content
    db.comment.create({userId: userId, photoId:photoId, content:content}).then((comment)=>{
      response.send(comment)
    }).catch(err=>{
        response.send(err)
    })
})

CommentsRouter.route('/:photoId')
.get((request, response)=>{
    const photoId = request.params.photoId
    db.comment.findAll({where:{photoId: photoId}}).then(comment=>{
        response.send(comment)
    }).catch(err=>{
        response.send(err)
    })
})

module.exports = CommentsRouter;
```

# 6.11 Testing Our Code

Ok so we now have the ability to add photos, right? Well, let's test it.

The easiest way to test end points is to use an API testing tool like PostMan on Insomnia. I personally really like Insomnia.

Go ahead and download it from: https://insomnia.rest/. Install it and open it.

From your console, you need to start your server so run 

```
npm run dev
```

In insomnia run the following GET request to http://localhost:8080, you should see our photo application.

![https://p289.p2.n0.cdn.getcloudapp.com/items/Z4uD8qZp/03b7db62-c4b0-4a45-9352-0d552ca6e9cf.jpg?v=b86f2fa9646bc132d9aef7ffb1547ca2](https://p289.p2.n0.cdn.getcloudapp.com/items/Z4uD8qZp/03b7db62-c4b0-4a45-9352-0d552ca6e9cf.jpg?v=b86f2fa9646bc132d9aef7ffb1547ca2)

Create a `POST` request to `/images`. Here are the steps:

- Select `POST` from the method dropdown (it will be set to `GET` by default
- Choose `Multipart Form` under `Body' dropdown
- Then provide two name/value pairs
- - Provide a `title` name and value first
- - Then provide a `file` name and value (for the value, use any JPEG laying around, use the dropdown on the right side to choose a file) 

After you send it you should see the following:

![https://p289.p2.n0.cdn.getcloudapp.com/items/xQux8Y0w/c6bd1207-ff48-4b0c-acf0-e3d4c5c56984.jpg?v=6b237d439670902a6072d5815a4b1219](https://p289.p2.n0.cdn.getcloudapp.com/items/xQux8Y0w/c6bd1207-ff48-4b0c-acf0-e3d4c5c56984.jpg?v=6b237d439670902a6072d5815a4b1219)

Now do a `GET` request from /images and you should see JSON output from the database for the images you have uploaded.

![https://p289.p2.n0.cdn.getcloudapp.com/items/geuyXorG/09bd60d8-11a3-4986-b99c-fa66c7e7b4d2.jpg?v=78e50dff76ca847495fd99a13ccc0229](https://p289.p2.n0.cdn.getcloudapp.com/items/geuyXorG/09bd60d8-11a3-4986-b99c-fa66c7e7b4d2.jpg?v=78e50dff76ca847495fd99a13ccc0229)

You will also see new photos located inside of public/images have been populated. We will use these photos and the JSON "mediaLiocation" later in our EJS to populate photos dynamically from the database.

We also created comments, see if you can figure out how to test the comments route by first adding a comment, then calling a comment back with a GET request.

Also try testing the User routes by creating one and then getting it.

---

# 6.12 Adding Images to Our Database From Our UI

On our `server.js` file, let's add a route to it for our /photos.

```js
app.get("/photo", (request, response) => {
  console.log("/photo");
  response.render("photo");
});
```

In our `PhotosRouter.js` we want to redirect our user back to the home page to view their photo in the collage so let's do that now by editing a line.

```js
// response.send(photos); // re-written in chapter 6.12 to redirect to home page
response.redirect('/');
```

In your `Views` directory - add a new view called `photo.ejs`. We will create a UI for uploading a photo. It has to take in a title and a file name labeled as "photo".  

```js
<%- include('partials/header'); %>
  <%- include('partials/navbar'); %>
</body>
  <!-- Main -->
  <div class="container">
    <form action="/images" method="POST" enctype="multipart/form-data">
      <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" name="title" required/>
        </div>
        <br />
        <div class="form-group floating-label-form-group controls">
          <label for="photo">Image</label>
          <input type="file" class="form-control" id="photo" name="photo" accept="image/jpeg, image/jpg, image/png, image/gif" required/>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class btn btn-primary id="sendMessaageButton">
            Upload
          </button>
        </div>
  </div>

<%-include('partials/footer'); %>
```

The `enctype="multipart/form-data"` (on line 6 above) is for the browser to know that the form contains multi-media. The browser will then encrypt the multimedia before sending it to the server. We are basically making an API call to our /images route and the name for the photo file upload is matched with the `photo` name.

It's not going to look right at first so we have to edit some CSS. Ugh, I know right?

In /public/assets/main.css, at the bottom of the file, add these 3 lines:

```css
body{
	background-color: black;
}
```


Let's go ahead and test our application!

- Click on the new 'Add Photo' button
- You'll have a new page where you can add a title and select a photo for upload
- Click `Upload`
- Your photo will be in the `public/images` directory!

---

# 6.13 Summary

Look at you! You have not only created a database but you created an API that works with a UI. We are going to leverage this API for our front end more with our EJS templates in future videos. In chapter 7 we will create our missing pages and then in our next chapter, chapter 8 our focus is going to be on improving our User experience by having the user's credentials encrypted, storing cookies so that you stay logged in from page to page and so that you can edit your navbar to only show the necessary login/logout/signup links based on your logged in status. I'll see you there.

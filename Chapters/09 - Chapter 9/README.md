# 9.1 Populating Our Images on Our Home Page

Right now, our application only shows the default images that came with html5up.net's Multiverse site/frontend. Let's change that. 

To do this we have to first make a call similar to our `PhotosRouter.js` where we get the database photos. Here is that code, put it right after all the  4 `const` (requirement) lines:

```js
PhotosRouter.route("/")
  .get((request, response) => {
    db.photo
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES");
        response.send(photos); 
        // response.redirect('/');
      })
      .catch((error) => {
        response.send(error);
      });
  })
```

We are going to do something similar in `PageRouter.js` but we are going to pass the photos as a JSON object to our EJS template we render.

Add this code to `/PageRouter.js` at the top after the 3 `const` (requirements lines):

```js
PageRouter.get("/", (request, response) => {
  if (request.session.userId) {
    db.photo
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES"); 
        response.render("index", {data: photos});
      })
      .catch((error) => {
        response.send(error);
      });
      
  } else {
    response.redirect("/login");
  }
});
```
Now that our EJS template is receiving all the photo data, we have to tell EJS what to do with it.

The easiest way to determine the location of the data you need is to output `console.log(data)` inside the EJS template so you can see how the data is structured.

Right now the main/index page is full of sample photos and 'Lorem ipsum' placeholder text. Let's change that to be live photo data from our JS server. Replace all the code in your `/views/index.ejs` file with this:

```js
<%- include('partials/header'); -%>
<body class="is-preload">
  <%- include('partials/navbar'); %>
  <!-- Wrapper -->
  <div id="wrapper">
    <!-- Header -->
    <header id="header">
      <h1>
        <a href="index.html"><strong>Multiverse</strong> by HTML5 UP</a>
      </h1>
      <nav>
        <ul>
          <li><a href="#footer" class="icon solid fa-info-circle">About</a></li>
        </ul>
      </nav>
    </header>

    <!-- Main -->
    <div id="main">
      <% for(let i=0; i < data.length; i++){ %>
        <article class="thumb">
          <a href="./images/<%= data[i].dataValues.mediaLocation %>"" class="image"
            ><img src="./images/<%= data[i].dataValues.mediaLocation %>"" alt="<%= data[i].dataValues.title %>"
          /></a>
          <h2><%= data[i].dataValues.title %></h2>
          <p>
            Nunc blandit nisi ligula magna sodales lectus elementum non. Integer
            id venenatis velit.
          </p>
        </article>
      </article>
      <% } %>
    </div>
    <%- include('partials/footer'); -%>
  </div>
</body>

```

---
# 9.2 Comments

So far, we have an application that works but we lack a main feature, adding comments.  Those comments are actually rather complicated to implement. The solution I have come up with isn't the most user friendly or gorgeous but it works.

To avoid over engineering a solution for a tutorial we will have a link that appears when you click on a photo. If you click on that link, the comments page will appear along with the photo.

Let's start by creating the comment link on our image. We do this by editing our `views/index.ejs` file

```js
    <div id="main">
      <% for(let i=0; i < data.length; i++){ %>
        <article class="thumb">
          <a href="./images/<%= data[i].dataValues.mediaLocation %>" class="image"
            ><img src="./images/<%= data[i].dataValues.mediaLocation %>" alt="<%= data[i].dataValues.title %>"
          /></a>
          <h2><%= data[i].dataValues.title %></h2>
          <p> 🎙 Read or Add 
            <a href="/comments/<%= data[i].dataValues.id %>">Comments</a>
          </p>
        </article>
      <% } %>
    </div>
    <%- include('partials/footer'); -%>
```

We grab the `photoId` value and pass it to our `/comments/` path. This will trigger a get request to our`/comments/:id` path.

So Let's head over to our `routes/CommentsRouter.js` file and make some changes:

```js
const bodyParser = require('body-parser');
CommentsRouter.use(bodyParser.urlencoded());
CommentsRouter.use(bodyParser.json());
CommentsRouter.use(express.static("public"));

CommentsRouter.route("/:photoId").get((request, response) => {
  const photoId = request.params.photoId;
  db.comment
    .findAll({ where: { photoId: photoId } })
    .then((comment) => {
      db.photo.findAll({ where: { Id: photoId } }).then((photo) => {
        response.render("comment", { photo: photo, comment: comment, requestURL: request.url});
      });
    })
    .catch((err) => {
      response.send(err);
    });
});
```

We need to grab all the photos that match the passed parameter `:photoId` and use it to look up a photo in the database.  

From there we render a `comment.ejs` page and pass to it all the details for our photo, comment, and requested URL. The requested URL is necessary so that we can recapture the photo ID and pass it to the EJS file.

Let's create a `/views/comment.ejs` file now.

```js
</body>
<%- include('partials/header'); %>
  <%- include('partials/navbar'); %>
    </body>
    <div class="container fluid">
      <div class="row">
        <div class="col col-4 mt-3">
          <h1>
            <%= photo[0].dataValues.title %>
          </h1>
          <img src="./images/<%=photo[0].dataValues.mediaLocation %>">
        </div>
        <div class="col col-4 mt-3">

          <ul>
            <% for ( var i=0; i <comment.length; i++){ %>
              <li>
                <%= comment[i].dataValues.content%>
              </li>
              <%}%>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <h1>Comment</h1>
      <form action="/comments<%=requestURL%>" method="POST" enctype="application/json">
        <div class="control-group">
          <div class="form-group floating-label-form-group controls">
            <label for="comment">Comment</label>
            <input type="text" class="form-control" id="comment" name="comment" required/>
          </div>
          <br />
          <div class="form-group">
            <button type="submit" class btn btn-primary id="sendMessaageButton">
              Submit
            </button>
          </div>
        </div>


        <%-include('partials/footer'); %>

```

We create a form that will send a post request to the same route. Let's set that up now. Head over to `routes/CommentsRouter.js` and edit the post request route.

```js
CommentsRouter.route("/:photoId").post((request, response) => {
    console.log(request.body)
  const photoId = request.params.photoId;
  const content = request.body.comment;
  db.comment
    .create({ photoId: photoId, content: content })
    .then((comment) => {
      response.redirect(`/comments${request.url}`);
    })
    .catch((err) => {
      response.send(err);
    });
});
```

Note we are reconsuming the request URL and redirecting the user back to the same page. This will cause a refresh and make the comments appear on the page.

--- 

# 9.3 Summary

Our application is really coming together, and we have reached all our objectives - there are just a few more items that need our attention that we will address in Chapter 10 mostly related to better error handling, security, and prep the application for production.

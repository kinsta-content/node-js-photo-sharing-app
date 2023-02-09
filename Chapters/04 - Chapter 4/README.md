# 4.1 Templating Engines

HTML is typically not DRY (Dont Repeat Yourself). You have to type everything out, repetitivly, by hand. It makes for ugly, long, messy files sometimes.

EJS or "Embedded Javascript" is a way to template, or create dynamic portions, components, or pages without having to duplicate HTML code. It's DRY, not repetitive. It also alows us to use Javascript right next to HTML code.

Template engine options for nodejs include; EJS, Jade, Pug, Mustache, HandlebarsJS, Jinja2, Blade, and Twig.js.

There are a ton of template engines out there but EJS is by far the most popular given that it was created by the same developers as Express.

EJS, as it's website says, is a simple templating language that lets us generate HTML with plain JavaScript in simple straightforward scriplet tags.

# 4.2 Views

Your views are the files that contain the HTML templates to be rendered. EJS view files have the `.ejs` extension and are stored in the `views` in the root path.

```
project
│
└───views
│   │   index.ejs
│   │
│   └───partials
│       │   header.ejs
│       │   footer.ejs
```

While loading a view using `res.render()` you do not have to include the file extension to the `views` folder.

For example, to render the `index.ejs` view, we would call `res.render('index')`. The same applies to including files, `views/partials/header.ejs` becomes `partials/header`.

# 4.3 Partials

Partials let you turn parts of your application that repeat into reusable components. Components like your header, footer, sidebar etc that are reapeated across several pages. These repeated parts can be put into their own seperate view files; these are called partials.

Partials are included like so

```ejs
<aside>
    <%- include('partials/sidebar'); %>
</aside>
<main>....</main>


<!-- To pass data to the partial, an object is the passed as the second parameter -->
<aside>
    <%- include('partials/sidebar', {user: user}); %>
</aside>
<main>....</main>
```

---

# 4.4 EJS Syntax

`EJS` or Embedded JavaScript Templates, is a templating language that lets you generate HTML using plain javascript. No special syntax, just plain Javascript that outputs html.

### Installing ejs

To install ejs, we run,

```bash
npm install ejs
```

Next, in our Express project, we make `ejs` our view engine. By this I mean, we tell Express how to handle our `ejs` templates. 

On server.js, write the following code:

```js
// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs template
app.get("/", (req, res) => {
    res.render("index");
});
```

Note that `res.render()` will look in a `views` folder for the view. So you only have to define index since the full path is `views/index.ejs`. 

With that out of the way, let's look at `ejs` syntax examples:

### Variables

```ejs
<%= person.name %>
```

### If Statement

```ejs
<% if (person) { %>
    <h1><%= person.name %></h1>
<% } %>
```

### If-Else Statement

```ejs
<% if (person) { %>
        <h1><%= person.name %></h1>
    <%} else { %>
        <h1>Hey Stranger</h1>
<% } %>
```

### Foreach Loops

```ejs
<ul>
    <% post.forEach(function(post){ %>
        <li><%= post.title %></li>
    <% }); %>
</ul>
```

### Includes partials

```ejs
<%- include('partials/navbar'); %>
<main>....</main>


<!-- Pass data to the partial -->
<%- include('partials/navbar', {user: user}); %>
<main>....</main>
```

Additional Resources

-   [EJS docs](https://ejs.co/#docs)

---

# 4.5 Introduction to Model-View-Controller (MVC) Refactoring

MVC (Model-View-Controller) is a pattern in application development that emphasizes a separation between the software's business logic and display. This "separation of concerns" provides for a better division of labor and improved maintenance.

The three parts of the MVC software-design pattern can be described as follows:

- Model: Manages data and business logic
- View: Handles layout and display
- Controller: Routes commands to the model and view parts
  
How to refactor our application using the MVC pattern is covered in our next video.

# 4.6 Templating Our Project

1. Create a directory in the root of our project called "views". Inside of it create another directory called "partials".
0. Inside the views directory add a file and name it index.ejs.
0. Cut the contents of the body from /public/index.html and paste them into index.ejs.
0. Let's create a new file inside of /views/partials and call it header.ejs
0. Cut the contents from the closing head tag to the top of the index.html file and paste it into /views/partials/header.ejs.
1. Create a new file in partials called footer.ejs
2. Cut and paste the remainder of index.html into this footer.ejs file.
3. Cut out the navbar we created in chapter 3 and paste it into a new file called /partials/navbar.ejs.
4. At the top of index.ejs write the following code:
   
    ```js
    <%- include('partials/header'); -%>
    ```

5. In our previous video we discussd that `<%- CODE %>` allows us to render raw html. 
6. Where the navbar was, inside index.ejs, write the following code in it's place:

    ```js
        <%- include('partials/navbar'); -%>
    ```

7. add the following line to the bottom of index.ejs, above the <body> tag

    ```js
    <%- include('partials/footer'); -%>
    ```

8. Delete index.html now.

9.  You should be able to run `npm run dev` and still see your site. 

---

# 4.7 Summary

In this chapter we did a lot! We learned all about EJS templating and how to convert our index.html into individual views. We took repetitive code from our navbar, header, and footer, and made them into partials, and we learned about the MVC (Model View Controller) method of structuring our site.

It's starting to come together but we are still lacking capabilities of a database. In the next chapter we will learn all about MariaDB and implement it into our project. I'll see you there.

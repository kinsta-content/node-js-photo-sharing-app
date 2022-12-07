# 3.1 Starting our Photo Sharing Project

Since this is not a course on frontend web design, we are going to take a shortcut and download a prebuilt HTML website template. Head over to https://html5up.net/multiverse and click download.

This template looks pretty nice and will work for us. But it does use jQuery, which is a popular JavaScript library which is getting old. Its a bit of a legacy framework.

I wouldn't recommend using jQuery on a new website project and I'd suggest you research alternative for an app running on your live production website. We're using this template to speed things along. We'll be able to focus on learning node.js and the backend development tasks.

This template will be our basic starting point for our photo-sharing application.

Unzip that file, move into it's directory and then run the following command in your terminal or command prompt:

```bash
npm init
```

Press return all the way to the end of the prompt.

Create a .gitignore file like we created earlier and add `node_modules` to it.

Now run:

```bash
npm install express
```

Open the project in your favorite code editor.  Create a new file in the root of the project and called it `server.js`

In the new file copy the following code:

```js
const express = require('express');
const app = new express();
const port = 8080;
app.listen(port, ()=>{
    console.log(`Serving photo app on http://localhost:${port}`)
})
```

Start the server by running

```bash
node server.js
```

# 3.2 Automatic Restart with Nodemon

What is Nodemon? Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. With nodemon, you do not need to manually stop and start the server when you make changes to your code.

To install nodemon using npm run

```bash
npm install --save-dev nodemon
```

DevDependencies are the packages a developer needs during development. A peer dependency specifies that our package is compatible with a particular version of an npm package

We don't need nodemon for a production application but will use it for development.

> 💡 Note: Node version 18 supports the --watch flag to automatically reload when changes a made, so nodemon is only needed for older versions.
>
> 		node --watch server.js

To use nodemon, open your package.json file.

Replace the line that looks like:

```json
    "test": "echo \"Error: no test specified\" && exit 1"
```
with 
```json
    "dev": "nodemon server.js"
```

---

# 3.3 Setting our public folder for serving static files

Add a new directory in the root of the project called "public".

We need to register this directory with Express using our example from chapter 2.

Add the third line from the code block below (labelled 'this line' with a comment) to your server.js file.

```js
const express = require('express') 
const app = new express() 
app.use(express.static('public'))  // this line
app.listen(8080, ()=>{ 
    console.log('App listening on port 8080') })
```

Now let's move the following files/directories into /public:

- index.html
- images/
- assets/

If you are curious how to know what files/directories to move into the public directory, you should be able to look at the index.html file in the head section.

At this point, you should be able to run

```bash
npm run dev
```

and see your application running on http://localhost:8080

# 3.4 Creating a Navbar

Currently we only have index.html but we will want to add more functionality to our site including our login/logout feature as well as a button to add more photos and to comment on individual photos.

We are treating our site as a static site served from a static file located in public called index.html. This is all going to change as we progress through this course and learn about EJS templating engine. For now, let's create a route to our home page and create a navbar using bootstrap.

- Head over to https://getbootstrap.com/docs/5.2/getting-started/introduction/#cdn-links
- Copy the CSS link tag to our head of index.html 
- Just below the opening `<body>` tag in index.html file, add the following code:

```html
		<nav class="navbar navbar-expand-lg bg-light">
			<div class="container-fluid">
			  <a class="navbar-brand" href="/">Kinsta</a>
			  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			  </button>
			  <div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
				  <li class="nav-item">
					<a class="nav-link" href="/photo">Add Photo</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/login">Login</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/logout">Logout</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/signup">Signup</a>
				  </li>
				</ul>
			  </div>
			</div>
		  </nav>
```

Now run the application using `npm run dev` and open it in your browser. It should look something like this:

![https://p289.p2.n0.cdn.getcloudapp.com/items/8Lu1zgnK/68c7a7e8-c34f-418c-8a2c-97bf70821967.jpg?v=dacc04358d351e473fd381a37e30ab04](https://p289.p2.n0.cdn.getcloudapp.com/items/8Lu1zgnK/68c7a7e8-c34f-418c-8a2c-97bf70821967.jpg?v=dacc04358d351e473fd381a37e30ab04)

---

# 3.5 Summary

Wow, we made the beginnings of a decent looking application complete with a navbar. 

We created a server and made it possible to serve static assets from our public directory. 

We have a long ways to go with this project but it's exciting to see the early stages of it coming together. In the next section we are going to learn all about templating our site into individual EJS views. I'll see you there.

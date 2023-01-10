# 2.1 Chapter 2 - Express

There are a lot of Javascript developers, if you aren't already check out the javascript community on twitter - just search #javascript. With that being said, those javascript developer are always creating new custom modules and they post them for anyone to use in the Node Package Manager or npm for short. You can view these packages on npmjs.com and you can find a module that would be a great fit for your use case.

One package we will leverage from npm is called "express".

To install it we first must initialize our project which will create a file called `package.json`. More on that in the next video.

---

# 2.2 Initializing our project

Creating a package.json file can be done manually or using the <kbd>npm init</kbd> command and following the prompts. This is often referred to as "initializing a project". I prefer the easier route.

Run the following command from your terminal or command prompt:

```bash
npm init
```

- You will be shown some instructions
- Enter in the following command to begin creating your package.json file:

```
npm init <pkg>
```

- You will be prompted to enter details about your package.json file (package name, version (number), git repository, keywords, author, and license type)
- You can enter the in or leave them blank
- You will then be shown a preview of your package.json file
- If it looks good type 'y' and press enter
- When you are done, a new file called package.json will be created!

All NPM package dependencies are defined in a package.json file. Beyond packages, package.json also holds your projects metadata, associated scripts to run, and your application's entry point. This makes the package.json file the heart of any Node.js project.

Below is a sample package.json file contents:

```json
{
    "name" : "hello",
    "version" : "1.0.0",
    "description" : "A simple server",
    "main" : "server.js",
    "keywords" : ["server", "express"],
    "author" : "Hello K. World",
    "licence" : "MIT",
    "scripts": {},
    "dependencies": {
        "optimist": "~0.6.0", 
        "request": "~2.30.0",
        "skateboard": "^1.5.1"
    },
    "devDependencies": {
        "escape-html": "^1.0.3"
    }
}
```

* The `name` property in a package.json file is a string that is the name of the project or package your are building. Note that the name can not have uppercase letters, leading periods, or underscores.

* The `version` property is the current version of the package or project. The version property usually follows [semantic versioning](https://semver.org/) standards althouh it is not required to.

> The `name` and `version` properties are the only required properties in a package.json file.

* The `description` is a string that contains a human-readable description of the package.

* The `main` property defines the entry point of the application. In our previous example, where we started our server using `node server.js`. our package.json file would be `"main": "server.js"`.

* The `keywords` property is a collection of keywords that describe your package.

* The `author` property is a string with the information of the package's author.

* The `license` property is a string stating the package's binding license.

* The `scripts` property is an object containing custom scripts for your application.

* The `dependencies` property is an object containing names and version numbers of packages your project or package depends on.

* The `devDependencies` property is almost identical to the `dependencies` property in terms of structure, with the main difference being that the dependencies property is used to define the dependencies that a package needs to run in production and the devDependencies property is used to define the dependencies the package needs to run in development.

> Running `npm install package` or `npm install package --save-dev` updates the dependencies and devDependencies properties respectively. 

For the full list of available properties available, check out the docs [here](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

---

# 2.3 Installing Express

We can easily install express using our terminal or command prompt with the following command:

```bash
npm install express
```

After you have installed express, you will see that your package.json file updated with a new dependency of express with a version number next to it.

Since we don't want the heaviest thing in the universe to be pushed to our repositories, we need to add a new file called `.gitignore` and add a line to it that reads:

```
node_modules
```

This will make sure when you git push, the node_modules, will not be included.

Anyone using your code on a new computer will need to run the command: 

```bash
npm install
```

This will automatically install all the dependencies listed in the package.json file and allow them to run the same application without downloading all the bloat from your repository. It will repopulate that node_modules directory.

---

# 2.4 What is express?

Before we get too far ahead of ourselves, you are probably wondering 'what is express and why do I care?'. 

`Express.js` or simply Express, is a Node.js web application framework that provides a set of features for web and mobile applications. 

Express is also very extensible and a number of popular frameworks like KeystoneJs and NestJs are built on it.

Express provides a set of tools for building web applications and APIs easily and quickly. In many ways, Express is the de facto standard server framework for Node.js.

To use Express, we first require it in our server.js file.

```js
const express = require("express");
```

---

# 2.5 How does Express make my life easier?

Let's repeat what we have previously done but in the express way.

Remember our code from chapter 1? 

```js
const http = require('http')
...
const server = http.createServer((request, response) => {
...
});
server.listen(8080);
```

With express, we achieve the same exact thing with the following lines:

```js
    const express = require('express')
    const app = express()
    app.listen(8080, () => 
        console.log("Server Listening on http://localhost:8080")
    )
    app.get('/', (request, response) => {
        response.json({
            Hosting: "Kinsta"
        })
    }
    )
```

Copy the above code into a new file called `index.js` and try running it using the following command:

```bash
node index.js
```

When you open up your browser you will see

![https://p289.p2.n0.cdn.getcloudapp.com/items/Kou15Yz1/67a7d316-1f97-4a46-8983-bf2dad97f3c0.jpg?v=73f1cdaf87ea3e0eca67b71b7ad03964](https://p289.p2.n0.cdn.getcloudapp.com/items/Kou15Yz1/67a7d316-1f97-4a46-8983-bf2dad97f3c0.jpg?v=73f1cdaf87ea3e0eca67b71b7ad03964)

# 2.6 Breaking it down

In the previous video you could see that express did a lot of operations for us to respond better to browser requests. JSON for example, was built in, this allows us to build APIs quickly with node.js and Express.

We can define routes and its response that our server will give when that route is hit.

With Express, we can refactor the big request handler we created in chapter 1 into many smaller and easier to read and write chunks. This makes our application more modular in a maintainable and convienient way.

Another benefit - we can define the type of response and method the server will respond with. 

Let's introduce a new module called Path - path is another built in like fs that allows us to get the specific path to a file. 

We can specify a GET or POST method to ensure the proper handling of an http request.

Let's take a look at this "get" request" to the `/` (root) path that will respond with index.html:

```js
const path = require('path')
...
app.get('/', (request, response)=>{
    response.sendFile(path.resolve(__dirname, 'index.html'));
});
```

If we were only to use `index.html` we would get an error because it requires an absolute path. `path.resolve(__dirname, 'indexhtml')` resolves this issue.

Since we are talking about benefits, Express also provides tools like `sendFile` method which if we had to write out without Express would be 40+ lines of code alone. That's unecessary complexity for anyone.

---

# 2.7 Asynchronous With Callback Functions


What is a Callback Function? 

Callback Functions we have seen in a few examples before but the main premise is that it allows for tasks to be performed asynchronously. Meaning we don't have to wait for 1 task to complete before moving on to the next. Node.js allows for the possibility of performing tasks in parallel where no individual task is blocking another.

The way it supports this asynchronous ability is with callback functions.  

```js
//example
app.get('/', (request, response)=>{
    // this is the callback
})
```

This means if 2 requests come in at the same time, they can both be handled and one doesn't have to be completed before the other one starts.

---

# 2.8 Serving Static Files with Express

We have looked at how to handle requests made to routes we defined, now we should look at how to serve static files, that is, files that already exist on our server. For example images, CSS files, font files, JSON, JavaScript files, etc...

This is achieved using the **express.static** built-in middleware function. The structure is like so:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets. The options argument is an array of properties that modifies its behaviour.

For example, following code would serve images, CSS files, and JavaScript files in a directory named `public`:

```js
app.use(express.static('public'))
```

Now, you can access the files that are in the public directory.

You are probably wondering, but `app.use` is a special method to increase functionality with Express by adding a function to our application's middleware. We will learn a lot about middleware through this course, don't worry, but for now just press the "I believe button".

An important note:

Static files served from "public" will always be relative to the public directory, not the root.

![https://p289.p2.n0.cdn.getcloudapp.com/items/RBuZ2yWl/1d02cc65-3f82-4090-8497-cb61258344be.jpg?v=4056f91a0946ff10f4cd278d3b225cf9](https://p289.p2.n0.cdn.getcloudapp.com/items/RBuZ2yWl/1d02cc65-3f82-4090-8497-cb61258344be.jpg?v=4056f91a0946ff10f4cd278d3b225cf9)

So in the above example, to call a file located in the /public/css directory from an html link tag, you'd only specify it like this:

```html
<link  rel="stylesheet" href="/css/style.css" ...>
```

Not like this:
```html
<link rel="stylesheet" href="/public/css/style.css" ...>
```

---

# 2.9 Summary

In this chapter we learned all about third party custom packages and how to install them using npm. 

We learned that Express is a great tool for handling requests and serving responses and that it drastically reduces our lift.

We learned all about the package.json file, you probably don't want to hear that file name ever again after that video but we learned that it houses all our meta data for our application.

Lastly, we learned all about static files and how to serve them.


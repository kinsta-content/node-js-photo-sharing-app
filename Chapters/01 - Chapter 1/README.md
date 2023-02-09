# 1.1 CHAPTER 1 - Node.js

Hello I'm Drew Karriker and I'm a nuclear engineer turned web developer and devops instructor. 

Throughout the course, we are going to be building a photo sharing application with comments and login functionality and then we are going to deploy it to Kinsta Application Hosting.

If you have questions you can reach me and other students at the Kinsta Discord. The link will be below this video. 

You can also view code snippets and notes on github using the link below.

I look forward to teaching you, let's get started!

---

# 1.2 Requirements

No previous knowledge of Node.js development is required but you should have some basic programming knowledge. 

Knowing how to work with GitHub repos, command line, CSS, and HTML are recommended prerequisits.

Please head to github  <INSERT PUBLIC GITHUB REPO LINK> and clone the notes for this course to your local computer. You will need a github account.

Some familiarity with command line basics is a plus but not necessary. You can get up to speed quick here: https://www.freecodecamp.org/news/command-line-for-beginners/

---

# 1.3 About the Course

This course will teach you everything you need to know to build a functional app with Node.js, Express, and Maria DB. We will then learn how to deploy it to kinsta. This application stack is known in the developer community as a MEEN stack or MySQL, Express, Nginx, and Node.js. Through the process you will sharpen your Javascript skillset and gain familiarity with one of my favorite deployment tools, kinsta application hosting. 

Don't forget to update your resume when we are all done!

---

# 1.4 Node.js

Node.js is a very popular server-side framework.  Lots of companies are building applications with Node.js and you are going to learn a valuable skillset that will make you attrictive to companies like Wal-mart, PayPal, Ally Bank, Linkedin, Youtube, Amazon, Netflix, Reddit, and more. 

In this course you will learn to work with Node.js together with Express and MariaDB and build a photosharing application from scratch.  

In the process, you will progress from beginner to where you can build apps effectively using these technologies. 

We will cover a bunch of topics like user authentication, data validation, asynchronous Javascript, Password hashing, Express, MariaDB, templating engines, maintaining user sessions, and more.

---

# 1.5 The App We Are Going To Build

We will build a photo sharing application that allows users to add photos and post comments after they have signed up with an account.

After a user registers, they can go to the home page and log in. 

The navigation bar will dynamically show different items depending on the user being logged in or out. We will achieve this using EJS - a templating engine for javascript.

Once the user is logged in, the navigation bar will have a "Log out" button.  There will also be a "new photo" button where a user can upload and publish a new photo.

When the user goes back to the home page - the new photo will be posted there. If you click on an image, you can see it's comments.  

Throughout this application development, we will learn a lot of concepts and solidify our Node.js, Express, and Mariadb knowledge.

It has been my experience that when following a tutorial, it's best to follow it as written and not customize variable names or anything until after the tutorial concludes. This prevents odd edge cases from happening where your code slightly deviates from the instruction making troubleshooting difficult. This course has incremental saves for each chapter allowing a student to follow and compare code. Please leverage git to save progress.

---

# 1.6 What Is Node.js?

Before we can understand what Node.js is. We should first learn what it isn't. It isn't a programming language. It's a tool.

We should probably also know a little about how your web browser works while surfing the internet. Now I know that may sound condesending but it's not the intention at all. These fundamentals are key to understanding Node.js.

When a user opens up their browser and makes a request to a site, their browser is known as a client.  The client makes a request of a specific website to a server - when it receives the request it responds with the content of the requested site to the client's browser.  

For example, I make a request to google.com from my browser, Google's servers respond back with HTML for google.com.

There are many serverside programming languages such as Deno.JS, Python, ASP, Java, PHP, and ruby to name a few.  They all do basically the same things - respond to a browser request appropriately on the server.

Traditionally, javascript was only used in browsers. It wasn't until 2009 when Google Chrome's powerful Javascript Engine called V8 hit the scene when it all changed. 

Not only did javascript work in the browser but it could be ran on the server and manipulate files. Now, Javascript developers can develop using javascript for serverside applications.

What you need to know about the V8 Engine:

- V8 engine is performant, fast
- Node.js encourages asynchronous coding style for making faster code while avoiding multithreaded problems
- Provides the ability to share code between the browser and server since they both use Javascript
- It's wildly popular so there are lots of packages, libraries, and frameworks

---

# 1.7 Installing Node.js

Head over to download.nodejs.org. It should open an appropriate page for your specific computer type and download the LTS or "Long Term Support" version of Node JS.

I'll be downloading 18.11.0 LTS.

Installation should be straightforward, it will install similar to any other program. Another option, if you are on a Mac, you can download it using the following command with homebrew (if you have homebrew):

```
brew install node.js
```

---

# 1.8 Verify The Installation

In your terminal or command prompt run the following command `node -v` or `node --version`. It should show you the version that is installed. This will be a proof that it is installed, otherwise you will get a response of "command not found"

Installation of Node comes with Node Package Manager or NPM. We'll cover NPM in detail in a bit.

---

# 1.9 Hands on Exercise

For now, Let's create our first server!

In your editor of choice, I'll be using Mircrosoft's free Visual Studio Code app throughout this course, create a file and call it `example_server.js`. Add this code:

```js
const http = require('http');
const server = http.createServer(
    (request, response) =>{ 
        console.log(`Server running at http://localhost:8080`);
        console.log(request.url);
        response.end('Hello kinsta');
    }
)
server.listen(8080)
console.log("Server running on http://localhost:8080")
```

Let's break this down...

The require function in Node.js helps us to grab the package in Node.js called http.

Require is similar to "import" or "include" from other languages you may be familiar with. Javascript convention dictates that when we require a module, we put it in a variable by the same name.

We require `http` package and set it to a variable called `http`. We can then use `http` as we would any other object.

`http` is a built in package that node.js provides to perform actions on the server.

Next we create and start a server with the `createServer` method from http package.createServer which takes in a function as a parameter.

This function is known as a callback function.  It will be called if/when the `createServer` function is completed.

When it is called, it'll be provided with the request (from the browser).

We can do anything we like with the request and response, in this example we simply log the request URL and respond with "Hello Kinsta" in the body of the function.

```js
server.listen(8080)
```

Lastly, `server.listen()` - when we start our server, we have to specify a port that the server will listen to for requests. You can use any number you can dream up aside from one already in use.

In this case, we are listening on port 8080. It's common to store the port value as a variable and call the variable inside the server.listen() function.

---

# 1.10 Running Our Server


To run our server simply run in a terminal or command prompt the following command (be sure you're in the correct directory):

```bash
node example_server.js
```

Now open a browser to https://localhost:8080 and the browser should read "Hello Kinsta"!

Pretty neat huh? This happened because our Node.js server has responded to our browser's request for localhost:8080.

If you look at your terminal or command prompt you will see that it is logging `/` because you have opened the / path.  You could use anything like for example localhost:8080/Kinsta_Rules and we would see `/Kinsta_Rules` in the logs.

There are a few problems with our app, it says "hello kinsta" no matter what url you put in. We will make much more complicated servers as this course progresses. 

The reason you always see "Hello Kinsta" is because we responded to the request with the code with `response.end('Hello Kinsta');` but we haven't provided it any logic to work with.

We could use a series of if-else statements!

---

# 1.11 If / Else Statements

In your terminal, type the command `control` + `c`. This will cause `example_server.js` to stop running.
    
Next, let's reprogram the server with conditional statements for different paths.

Replace all the text in your `example_server.js` with this code:

```js
const http = require('http');
const server = http.createServer(
    (request, response) =>{ 
        if ( request.url == '/about' )
            response.end( 'The about page' );
        else if ( request.url == '/login')
            response.end( 'Log in!' );
        else if ( request.url == '/logout')
            response.end( 'Log out!' );
        else {
            response.writeHead(404)
            response.end('Page Not Found')
        }
    }
);
server.listen(8080)
```

Run the same command again in terminal or command prompt:

```bash
node example_server.js
```

After the command runs, you can open your browser to http://localhost:8080/about and see a response `The about page`

---

# 1.12 What Is "writeHead(404)"?

`writeHead` will provide the status code of a request - normally a status code of 200 is what we want, it means the server responded and it's good. A 404 means the requested resource wasn't found. So, we provide a response with a status code of 404 when you request a path we don't expressly provide (that is "/about", "/login", or "/logout")

We can make a request to an end point and show in the browser's network tab that the response is a 404.

At this point, let's turn off the server using the command `control` + `c`. You'll need to restart your server every time there is a change, currently. We will fix that soon enough.

---

# 1.13 Responding With HTML

We have been responding to requests up to this point with static text, but this is a course on how to build a web application that works in browsers - so we should probably use html, right? Right!

Imagine for a moment that we created a bunch of HTML files and wanted to serve them to their specific end points. `/about` would go to about.html for example.

To respond with HTML, we need to require a module called FileSync. FileSync or FS for short is a built in module like `http` that enables javascript to read and write to files on our server. Let's add FileSync to our example application.

```js
const http = require('http')
const fs = require('fs')
const homePage = fs.readFileSync("index.html");
const aboutPage = fs.readFileSync("about.html");
const contactPage = fs.readFileSync("contact.html");
const notFoundPage = fs.readFileSync("notfound.html");
const server = http.createServer((request, response) => {
  if (request.url === "/about") response.end(aboutPage);
  else if (request.url === "/contact") 
    response.end(contactPage);
  else if (request.url === "/") 
    response.end(homePage);
  else {
    response.writeHead(404);
    response.end(notFoundPage);
  }
});
server.listen(8080);
```

`fs.readFileSync` enables us to read the contents of a specific file which we return as a response.

---

# 1.14 Summary

With these previous steps we have created a single javascript file to listen for requests, respond to those requests with a file using a function.  This function is called a _request handler_ and all it does is looks at a request and determines how to respond. Great news! Every Node.js Application operates under this same basic premise. 

This may be simple on smaller sites, but things can get super hairy, quickly as sites become larger. For these situations, we leverage a tool called Express.js which we will learn all about in the next chapter.


In summary, we built a simple version of the app we are going to build, a Node.js photo sharing application leveraging Express and MariaDB. We learned about requests, responses, and status codes and how to respond with html files.

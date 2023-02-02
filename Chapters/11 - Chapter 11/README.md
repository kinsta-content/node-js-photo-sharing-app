# 11.1 Deploying to Kinsta - Setup

Yay! We have completed our application and it's ready for the world wide web. We could figure out hosting for ourselves and create a CI/CD pipeline that handles the deployment of our application or we could save a ton of headache and use an awesome new platform for deploying our application and hosting our database on kinsta.

Currently, our application lives inside of a directory called html5up-multiverse. At the time of creating this course, there is no way to specify a deployment path on kinsta which isn't a big deal. We just need to move all the contents of the html5up-multiverse directory into the root of our project. 

We need to create a package.json command for production called "start".

In package.json add a new line that should look like this:

```json
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },

```

Go to github.com and login.

Create a new repository - make sure it's public. 

Push your code to the repository.

---

# 11.2 Let's Deploy This Application!

If you haven't already, head to https://kinsta.com and create an account.

They offer a free trial so you can totally check out the Kinsta platform at no cost in a real-world environment.

Log into my.kinsta.com.

Go to Applications

![https://p289.p2.n0.cdn.getcloudapp.com/items/WnuDP5Kr/5177cd5d-78db-4cde-aec8-26a3f68d9f6d.jpg?v=344e0c0494077a2bc9b12db2ad0f0798](https://p289.p2.n0.cdn.getcloudapp.com/items/WnuDP5Kr/5177cd5d-78db-4cde-aec8-26a3f68d9f6d.jpg?v=344e0c0494077a2bc9b12db2ad0f0798)

Select "add service"
![https://p289.p2.n0.cdn.getcloudapp.com/items/d5undQvZ/f1d1eb23-69bc-4e1b-b10d-ffe2f26766aa.jpg?v=830d4b31b088c3ec4d4b140f923b1c6e](https://p289.p2.n0.cdn.getcloudapp.com/items/d5undQvZ/f1d1eb23-69bc-4e1b-b10d-ffe2f26766aa.jpg?v=830d4b31b088c3ec4d4b140f923b1c6e)

Select Application and fill out the form - be sure to select your github repository.

![https://p289.p2.n0.cdn.getcloudapp.com/items/p9uQm4bw/e968d8e7-832b-46eb-8122-9ff2ba1bcaf4.jpg?v=aafbd5d046ee3a530b317e575bac00eb](https://p289.p2.n0.cdn.getcloudapp.com/items/p9uQm4bw/e968d8e7-832b-46eb-8122-9ff2ba1bcaf4.jpg?v=aafbd5d046ee3a530b317e575bac00eb)

Next we need to add another service except this time it needs to be a database.

![https://p289.p2.n0.cdn.getcloudapp.com/items/WnuDP5x4/38d69645-99e8-4511-b330-c4b10e0ca963.jpg?v=4cad882e9e08c95a0536ceffc5ebff53](https://p289.p2.n0.cdn.getcloudapp.com/items/WnuDP5x4/38d69645-99e8-4511-b330-c4b10e0ca963.jpg?v=4cad882e9e08c95a0536ceffc5ebff53)

Create the database and then select it from your list of applications.

![https://p289.p2.n0.cdn.getcloudapp.com/items/6quG4AYD/2a5e6146-2957-4003-951c-8019a2f5bdc7.jpg?v=fbeb8ddca861379aa9813420f48e64e4](https://p289.p2.n0.cdn.getcloudapp.com/items/6quG4AYD/2a5e6146-2957-4003-951c-8019a2f5bdc7.jpg?v=fbeb8ddca861379aa9813420f48e64e4)

Let's get the database connection details.

![https://p289.p2.n0.cdn.getcloudapp.com/items/bLu5PNqE/be0eb3c0-1a3a-4cbb-b2c6-b1ddbbccae8b.jpg?v=292d9112c4683d195a7b4cd349a6075b](https://p289.p2.n0.cdn.getcloudapp.com/items/bLu5PNqE/be0eb3c0-1a3a-4cbb-b2c6-b1ddbbccae8b.jpg?v=292d9112c4683d195a7b4cd349a6075b)

There are some details we need to update on our application from this screen:

![https://p289.p2.n0.cdn.getcloudapp.com/items/2Nu7ZQv7/0da953e5-b861-418e-bd38-cfcc8128f7cc.jpg?v=df68436eda3f97a80d430225f72fff5d](https://p289.p2.n0.cdn.getcloudapp.com/items/2Nu7ZQv7/0da953e5-b861-418e-bd38-cfcc8128f7cc.jpg?v=df68436eda3f97a80d430225f72fff5d)

On server.js, update your sqlPort to match the port number provided.

Inside of /config/config.json, update it to match the hostname, username and password.

Save your changes and commit your code to your repository. 

If we go to our photosharing application on the list of applications and open it up. We should see something like this:

![https://p289.p2.n0.cdn.getcloudapp.com/items/7Kuk9wQQ/7204ed59-05b4-48f2-babc-8a064ceb78fd.jpg?v=266ea4dab9638ec476cacdfcddb25110](https://p289.p2.n0.cdn.getcloudapp.com/items/7Kuk9wQQ/7204ed59-05b4-48f2-babc-8a064ceb78fd.jpg?v=266ea4dab9638ec476cacdfcddb25110)

![https://p289.p2.n0.cdn.getcloudapp.com/items/BluW6mWb/cd797201-2161-4278-960c-4263dc17f912.jpg?v=f85fad3f4cbe8eb64567f72d59f16bbe](https://p289.p2.n0.cdn.getcloudapp.com/items/BluW6mWb/cd797201-2161-4278-960c-4263dc17f912.jpg?v=f85fad3f4cbe8eb64567f72d59f16bbe)

Your application is now live!

---

# 11.3 Summary

Update your resume, you did it! 

We covered a lot of material from the basics of npm and we walked all the way through encrypting our passwords. We learned all about middleware, MariaDB, and Express. We built a beautiful application to show off to our friends. Most importantly, we have added new skills to our resume.

Remember, you can get started for free hosting this app, or any app or database on Kinsta's platform. Get started with a free trials.

- [Get Started Now](https://kinsta.com/signup/?product_type=app-db)

They say journey's are alone and adventures are with friends. We have learned a lot in this course together. I want to personally thank you for taking the time out of your busy life to embark on this adventure with me. Until next time!

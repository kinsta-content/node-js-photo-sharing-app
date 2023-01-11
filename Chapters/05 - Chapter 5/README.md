# 5.1 MariaDB Introduction

Wikipedia says, "`MariaDB` is an open-source fork of the MySQL relational database management system. It is released under the GNU General Public License and can be used commercially without obtaining a licence." It was initially released on October 29th, 2009 after MySQL was acquired by the Oracle Corporation.

A relational database is based on the relational model which is an intuitive and straightforward way of representing data in tables.

MariaDB architecture is different from the architecture of SQL in some ways.

MariaDB uses a pluggable storage engine architecture. Basically, this means that MariaDB knows very little about creating or populating a table, reading from it, or building proper indexes and caches. It just delegates all these operations to a special plugin type called a storage engine. An example of this is InnoDB which adds support for transactions and foreign keys.

---

# 5.2 Architecture of MariaDB

MariaDB architecture is partly different from the architecture of traditional DBMSs (Database Management Systems), like SQL Server.

MariaDB uses a pluggable storage engine architecture. Basically, this means that MariaDB knows very little about creating or populating a table, reading from it, building proper indexes and caches. It just delegates all these operations to a special plugin type called a storage engine. An example of this is InnoDB which adds support for transactions and transactions and foreign keys.

MariaDB does not support the concept of schema. In MariaDB SQL, schema and schemas are synonyms for database and databases.

When a user connects to MariaDB, they don't connect to a specific database. Instead, they can access any table they have permissions for. There is however a concept of default database, see below.

- A database is a container for database objects like tables and views
- A database serves the following purposes:
- - A database is a namespace
- - A database is a logical container to separate object
- - A database has a default character set and collation, which are inherited by their tables
- - Permissions can be assigned on a whole database, to make permission maintenance simpler
- - Physical data files are stored in a directory which has the same name as the database to which they belong

---

# 5.3 System Databases
MariaDB has the following system databases:

- `mysql` is for internal use only, and should not be read or written directly.
- `information_schema` contains all information that can be found in SQL Server's `information_schema` and more. However, while SQL Server's `information_schema` is a schema containing information about the local database, MariaDB's `information_schema` is a database that contains information about all databases.
-  `performance_schema` contains information about MariaDB runtime. It is disabled by default. Enabling it requires setting the `performance_schema` system variable to 1 and restarting MariaDB.

---

# 5.4 Configuration Files

MariaDB can use several different configuration files. You can configure MariaDB to run the way you want by configuring the server with MariaDB's option files.

Configuration files are searched in several locations, including in the user directory, and if present they all are read and used. They are read in a consistent order. These locations depend on the operating system. It is possible to tell MariaDB which files it should read.

- On mac OS, by default, the configuration file is called `my.cnf`
- On Linux, the default is also `my.cnf`
- On Windows, by default the configuration files can be called `my.ini` or `my.cnf`, `my.ini` is more common.

---

# 5.5 Installing MariaDB

To install MariaDB, visit downloads.mariadb.org, select your operating system (if it is not automatically selected), select a package type and click on download. This would download an installer package. 

If you are on a mac, install following this guide:
https://mariadb.com/resources/blog/installing-mariadb-10-1-16-on-mac-os-x-with-homebrew/
Basically, the command if you have Homebrew is:

```bash
brew install mariadb
brew services start mariadb 
```

On mac you'll need to perform a few tasks to gain access to the database. Please see addendum section for more details! Link is below the video

Next, depending on your OS, run the installer and follow the prompts. Enter a difficult but memorable password when prompted to enter a new root password. If you are using Homebrew, you won't be prompted for anything.

The purpose of the mysql_install_db program is to initialize the data directory, including the tables in the mysql system database. It does not overwrite existing MySQL privilege tables, and it does not affect any other data. To re-create your privilege tables, first stop the mysqld server if it is running

Once that's done, you need to install the MariaDB connector for Node.js called sequelize, more on that in the next video.

---

# 5.6 Installing Sequelize

Sequelize is a Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more.

What is an ORM? An object-relational mapper (ORM) provides an object-oriented layer between relational databases and object-oriented programming languages without having to write SQL queries. This reduces boilerplate code and lets you develop faster.

Sequelize is installable using NPM:

```bash
npm install sequelize sequelize-cli mariadb
npx sequelize init
```

On some machines you may have success with this instead:

```bash
npm install sequelize sequelize-cli mariadb
sequelize init
```

Some new files should be created specifically for sequelize which tries to stick with the MVC model. We don't need migrations and we don't need seeders so let's delete those.

Next, To use sequelize, we first open a connection to the database. In our index.js file, let's write some code:

Run the following command to access an interactive mysql terminal:

```bash
mysql
```

Inside the interactive mariadb shell. We are creating a database and calling it "photos", run the following:

```mysql
DROP DATABASE IF EXISTS photos;
CREATE DATABASE photos;
```

This looks to see if the database exists, if it does, then it drop it but if it doesn't exist, it'll create it. 

We need to connect sequelize configuration with our mariadb. Head over to our project directory, and look at config/config.json and make sure the database name matches what we just created (photos). We also need to change the dialect to `"mariadb"`. The password should also be set to `"password"`.

It should look like this when it's complete:

```json
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "photos",
    "host": "localhost",
    "dialect": "mariadb"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "photos",
    "host": "localhost",
    "dialect": "mariadb"
  },
  "production": {
    "username": "root",
    "password": "password",
    "database": "photos",
    "host": "localhost",
    "dialect": "mariadb"
  }
}
```

To create a connection, we specifiy the name of the database we want to connect to, the user we are connecting as, and the user's password to authorize the connection in our config/config.json. The host field is the server the database is running on. It can be set to localhost when our application and database are running on the same machine or the ip address (or Fully qualified domain) of the machine it is running on.

Next we define a model (think of this as a database table). 

We need to create a new file inside of /models directory called `PhotosModel.js`. Let's write some code in there:

```js
module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define(
    "photo", // will be pluralized
    {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.INTEGER,
      },
      mediaLocation: {
        type: DataTypes.STRING,
      },
    } //options such as static table name and timestamps false can be passed here as obj
  );

  return Photos;
};
```

DataTypes, define what types of data our fields can be. In the above example, path can only be a string. Sequelize has a number of builtin datatypes namely:

DataTypes.STRING;
DataTypes.BOOLEAN;
DataTypes.INTEGER;
DataTypes.DATE;
see the docs for more

Creating records are covered in subsequent modules.

Let's create our other models for comments and users. Inside the models/ directory create 2 files called `CommentsModel.js` and `UsersModel.js`.

Inside of `UsersModel.js`, write the following code:

```js
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
      "user",
      {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        username: {
          type: DataTypes.STRING,
        }
      }
    );
  
    return Users;
  };
```

Inside of the `CommentsModel.js` file write the following code:

```js
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define(
      "comment",
      {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        photoId: {
          type: DataTypes.INTEGER,
        },
        content: {
          type: DataTypes.STRING,
        }
      }
    );
  
    return Comments;
  };
```

We have now created our tables for our MariaDB in our models. Next, we need to import the module sequelize into our server.

Open your `server.js` file and add the new lines of code after the `\\routes` comment:

```js
//imports
const express = require("express");
const db = require("./models"); //this line
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// server start
const port = 8080;
const sqlPort = 3307;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

//routes

//db
db.sequelize
  .sync({})
  .then(() => {
    app.listen(sqlPort, () => {
      console.log(
        `MariaDB Connection has been established successfully to http://localhost:${sqlPort}.`
      );
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// set the view engine to ejs
app.set("view engine", "ejs");
// serve static files from public
app.use(express.static('public'))
// use res.render to load up an ejs template
app.get("/", (req, res) => {
  res.render("index");
});
```

--- 

# 5.7 CRUD Operations

What is CRUD? In computer programming, create, read, update, and delete are the four basic operations when working with stored data.

- CREATE | 
The _create_ function allows users to create a new record in the database. In most SQL relational database applications, the Create function is called INSERT.

- READ | 
The _read_ function is similar to a search function. It allows users to search and retrieve specific records in the table and read their values. Depending on the application, users may be able to find desired records using keywords, or by filtering the data based on predefined criteria. For example, a database of cars might enable users to type in "1996 Toyota Corolla", or it might provide options to filter search results by make, model and year.

- UPDATE | 
The _update_ function is used to modify existing records that exist in the database. To fully change a record, users may have to modify information in multiple fields. For example, a restaurant that stores recipes for menu items in a database might have a table whose attributes are "dish", "cooking time", "cost" and "price". One day, the chef decides to replace an ingredient in the dish with something different. As a result, the existing record in the database must be changed and all of the attribute values changed to reflect the characteristics of the new dish.

- DELETE | 
The _delete_ function allows users to remove records from a database that is no longer needed. Some relational database applications may permit users to perform either a hard delete or a soft delete. A hard delete permanently removes records from the database, while a soft delete might simply update the status of a row to indicate that it has been deleted while leaving the data present and intact.

In our next chapter we will build our API routes that will structure our CRUD application.

---

# 5.8 Summary

Phew, you are a rock star. We have learned a lot so far, and this stuff isn't easy so pat yourself on the back!

With that being said it's best to talk about what we have covered so far. 

In chapter 1, we discussed NPM and Node.js to some length. We created a basic http server and then learned there was a better way to do it (with Express.js).

In chapter 2, We got to practice using npm (node package manager) and introduced the better way to create servers by learning all about Express.js.

In chapter 3, we learned all about templating using EJS (Embedded JavaScript).

In chapter 4, we broke down our html into individual parts. 

In this chapter we learned all about MariaDB and we practiced creating a database called photos, how to use sequelize, how to logically structure our application for MVC, an then we coded our connection to the database and created our comments, users, and photos models.

Watch in the next chapter as things fall more and more into place.

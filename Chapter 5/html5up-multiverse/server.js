const express = require('express');
const app = new express();
const port = 8080;
const db = require("./models");
app.use(express.static('public'))
app.listen(port, ()=>{
    console.log(`Serving photo app on http://localhost:${port}`)
})
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const sqlPort = 3307;
// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs template
app.get("/", (req, res) => {
    res.render("index");
});

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
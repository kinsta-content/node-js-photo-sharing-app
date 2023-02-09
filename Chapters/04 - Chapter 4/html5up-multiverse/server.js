const express = require('express');
const app = new express();
const port = 8080;
app.use(express.static('public'))
app.listen(port, ()=>{
    console.log(`Serving photo app on http://localhost:${port}`)
})

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs template
app.get("/", (req, res) => {
    res.render("index");
});
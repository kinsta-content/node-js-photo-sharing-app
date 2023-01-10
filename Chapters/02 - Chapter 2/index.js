const express = require("express");
const app = express();
app.listen(8080, () =>
  console.log("Server Listening on http://localhost:8080")
);
app.get("/", (request, response) => {
  response.json({
    Hosting: "Kinsta",
  });
});

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
console.log("Server running on http://localhost:8080")
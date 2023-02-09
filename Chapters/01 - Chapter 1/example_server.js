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
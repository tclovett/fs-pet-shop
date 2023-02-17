const fs = require('fs');
const http = require('http');


const port = 8000;

const server = http.createServer( (request, response) => {
    console.log("request.....", "Received request");
    const URL = request.url;
    const URLtoCheck = URL.substring(0,5);
    const toCheck = URL.substring(6);
    const method = request.method;
    if (URLtoCheck == "/pets") {
        fs.readFile("./pets.json", "utf8", function(err, data){
            const parsedDataArray = JSON.parse(data);
            if (err || isNaN(Number(toCheck)) || toCheck > (parsedDataArray.length - 1) || toCheck < 0){
                response.setHeader('Content-Type', 'text/plain');
                response.statusCode = 404;
                console.error("Internal Server Error");
                response.end("Not Found");
                return;
            }
            if (toCheck) {
                console.log(parsedDataArray[toCheck]);
                response.setHeader('Content-Type', 'application/json');
                response.statusCode = 200;
                response.end(JSON.stringify(parsedDataArray[toCheck]));
            }
            else {
                console.log(parsedDataArray);
                response.setHeader('Content-Type', 'application/json');
                response.statusCode = 200;
                response.end(JSON.stringify(parsedDataArray));
            }
        })
    }
    else {
        response.setHeader('Content-Type', 'text/plain');
        response.statusCode = 404;
        response.end("Not Found");
    }
})
server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
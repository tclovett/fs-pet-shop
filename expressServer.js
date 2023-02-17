const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const app = express();
app.use(express.json());
let json = fs.readFileSync('./pets.json');
json = JSON.parse(json);

app.get(/pets/, (req,res) => {
    const URL = req.url;
    const toCheck = URL.substring(6);
    fs.readFile("./pets.json", "utf8", function(err, data){
        const parsedDataArray = JSON.parse(data);
        if (err || isNaN(Number(toCheck)) || toCheck > (parsedDataArray.length - 1) || toCheck < 0){
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            console.error("Internal Server Error");
            res.send("Not Found");
        }
        if (toCheck) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(parsedDataArray[toCheck]));
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(parsedDataArray));
        }
    })
})
app.post("/pets", (req,res) => {
    if (!req.body.age || isNaN(Number(req.body.age)) || !req.body.kind || !req.body.name || Object.keys(req.body).length > 3){
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        console.error("Internal Server Error");
        res.send("Bad Request");
    }
    else{
        json.push(req.body);
        fs.writeFileSync('./pets.json', JSON.stringify(json));
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(req.body);
    }
})

app.listen(7000, () => {
    console.log('server is running');
})
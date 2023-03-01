const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const app = express();
const { Pool } = require('pg');
app.use(express.json());
let json = fs.readFileSync('./pets.json');
json = JSON.parse(json);

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'petshop',
    password: 'password',
    port: 5432
})
app.get("/pets", (req, res) => {
    console.log('hello');
    pool.query('SELECT * from pets', (err, result) => {
        if (err) {
            return res.sendStatus(400);
        }
        else {
            const rows = result.rows;
            res.send(rows);
        }
    });
    //const users = result.rows;
    //fs.readFile("./pets.json", "utf8", function(err, data){
       // const parsedDataArray = JSON.parse(data);
       // if (err){
       //     return res.sendStatus(400);
       // }
       // res.send(json)
    //})
})

app.get("/pets/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT name, kind, age FROM pets WHERE id = ' + id + ';', (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            const pet = result.rows[0];
            console.log("Single Pet ID ", id, " values: ", pet);
            res.send(pet);
        }
    })
    //fs.readFile("./pets.json", "utf8", function(err, data){
        //const parsedDataArray = JSON.parse(data);
       // let id = Number.parseInt(req.params.id);
        //if (id < 0 || id >= json.length || Number.isNaN(id)) {
       //     return res.sendStatus(400);
       // }
        //res.send(json[id]);
    //})
})
app.post("/pets", (req, res) => {
    let keys = Object.keys(req.body);
    let keysStr = keys.join(', ');
    pool.query("INSERT INTO pets (" + keysStr + ") VALUES ($1, $2, $3)",[req.body.name, req.body.kind, req.body.age], (err, result) => {
        if (err){
            console.log(err)
            return res.sendStatus(400);
        }
        else {
            console.log("Added Pet");
            res.send(req.body);
        }
    })
    //if (!req.body.age || isNaN(Number(req.body.age)) || !req.body.kind || !req.body.name || Object.keys(req.body).length > 3){
      //  return res.sendStatus(400);
    //}
    //else {
       // json.push(req.body);
       // fs.writeFileSync('./pets.json', JSON.stringify(json));
       // console.log("Added new entry");
       // res.send(req.body);
   // }
})
app.patch("/pets/:id", (req, res) => {
    const id = req.params.id;
    if (req.body.name) {
        pool.query("UPDATE pets SET name = $2 WHERE id = $1",[id, req.body.name], (err, result) => {
            if (err){
                console.log(err)
                return res.sendStatus(400);
            }
            else {
                console.log("Updated Name");
            }
        })
    }
    if (req.body.kind){
        pool.query("UPDATE pets SET kind = $2 WHERE id = $1",[id, req.body.kind], (err, result) => {
            if (err){
                console.log(err)
                return res.sendStatus(400);
            }
            else {
                console.log("Updated Kind");
            }
        })
    }
    if (req.body.age){
        pool.query("UPDATE pets SET age = $2 WHERE id = $1",[id, req.body.age], (err, result) => {
            if (err){
                console.log(err)
                return res.sendStatus(400);
            }
            else {
                console.log("Updated Age");
            }
        })
    }
    

/*
    fs.readFile("./pets.json", "utf8", function(err, data){
        if (err){
            return res.sendStatus(400);
        }
        else {
            let id = Number.parseInt(req.params.id);
            let petJson = json[id];
            if (id < 0 || id >= json.length || Number.isNaN(id)){
                return res.sendStatus(400);
            }
            if (!Number.isNaN(req.body.age)){
                petJson.age = req.body.age;
            }
            if (req.body.kind){
                petJson.kind = req.body.kind;
            }
            if (req.body.name) {
                petJson.name = req.body.name;
            }
            fs.writeFileSync('./pets.json', JSON.stringify(json));
            console.log("Changed Data");
            res.send(json);
        }
    })
    */
})
app.delete("/pets/:id", (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM pets WHERE id = $1', [id], (err, data) => {
        if (err) {
            res.sendStatus(400);
        }
        console.log(data);
        const deleted = data.rows[0];
        if (deleted) {
            res.send(deleted);
        } 
        else {
            console.log("row not found");
            res.sendStatus(400);
        }
        res.send(deleted);
    })
    //fs.readFile("./pets.json", "utf8", function(err, data){
        //if (err) {
        //    return res.sendStatus(400);
       // }
       // else {
        //    let id = Number.parseInt(req.params.id);
        //    if (id < 0 || id >= json.length || Number.isNaN(id)){
         //       return res.sendStatus(400);
          //  }
          //  else {
          //      json.splice(id, 1);
          //     fs.writeFileSync('./pets.json', JSON.stringify(json));
           //     console.log("Deleted Entry");
          //      res.send(json);
          //  }
       // }
   // })    
})
app.listen(8000, () => {
    console.log('server is running');
})
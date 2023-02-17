#!/usr/bin/env node
fs = require('fs');
let json = fs.readFileSync('./pets.json');
json = JSON.parse(json);
let input = process.argv;

if (input[2] === 'read') {
    if (input[3] !== undefined && isNaN(Number(input[3]))){
        process.on('exit', (code) => {
            console.error(new Error("Inproper read input (must be integer)"));
            process.exit(1);
        })
    } 
    else if (input[3] !== undefined){
        if (Number(input[3]) < 0 || Number(input[3]) > (require('./pets.json')).length){
            let code = 1;
            process.on('exit', (code) => {
                console.error(new Error("Index outside parameter of object"));
            })
        } 
        else {
            console.log(require('./pets.json')[Number(input[3])]);
        } 
    } 
    else {
        console.log(require('./pets.json'));
    }
} 
else if(input[2] === 'create'){
    if (!input[3]) {
        let code = 1;
        process.on('exit', (code) => {
            console.error(new Error("Usage: node pets.js create AGE KIND NAME"));
        })
    } 
    else if (!isNaN(Number(input[3])) && Number(input[3]) >= 0){
        if (!input[4]) {
            let code = 1;
            process.on('exit', (code) => {
                console.error(new Error("Usage: node pets.js create AGE KIND NAME"));
            })
        } 
        else if (isNaN(Number(input[4]))){
            if (!input[5]) {
                let code = 1;
                process.on('exit', (code) => {
                    console.error(new Error("Usage: node pets.js create AGE KIND NAME"));
                })
            } 
            else if (isNaN(Number(input[5]))){
                let newObj = {};
                newObj.age = Number(input[3]);
                newObj.kind = input[4];
                newObj.name = input[5];
                json.push(newObj);
                fs.writeFileSync('./pets.json', JSON.stringify(json));
                console.log(json);
            } 
            else {
                let code = 1;
                process.on('exit', (code) => {
                    console.error(new Error("Usage: node pets.js create AGE KIND NAME"));
                })
            }
        } 
        else {
            let code = 1;
            process.on('exit', (code) => {
                console.error(new Error("Usage: node pets.js create AGE KIND NAME"));
            })
        }
    } 
    else {
        let code = 1;
        process.on('exit', (code) => {
            console.error(new Error("Usage: node pets.js create AGE KIND NAME"));
        })
    }
} 
else if(input[2] === 'update'){
    if (!input[3]) {
        let code = 1;
        process.on('exit', (code) => {
            console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME"));
        })
    } 
    else if (!isNaN(Number(input[3])) && Number(input[3]) >= 0 && Number(input[3]) < (require('./pets.json')).length){
        if (!input[4]) {
            let code = 1;
            process.on('exit', (code) => {
                console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME"));
            })
        } 
        else if (!isNaN(Number(input[4]))){
            if (!input[5]) {
                let code = 1;
                process.on('exit', (code) => {
                    console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME"));
                })
            } 
            else if (isNaN(Number(input[5]))){
                if (!input[6]) {
                    let code = 1;
                    process.on('exit', (code) => {
                        console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME"));
                    })
                } 
                else if (isNaN(Number(input[6]))){
                    json[input[3]].age = input[4];
                    json[input[3]].kind = input[5];
                    json[input[3]].name = input[6];
                    fs.writeFileSync('./pets.json', JSON.stringify(json));
                    console.log(json[input[3]]);
                } 
                else {
                    let code = 1;
                    process.on('exit', (code) => {
                        console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME. NAME must not be a number"));
                    })
                }
            } 
            else {
                let code = 1;
                process.on('exit', (code) => {
                    console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME. KIND must not be a number"));
                })
            }
        } 
        else {
            let code = 1;
            process.on('exit', (code) => {
                console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME. AGE must be a number"));
            })
        }
    } 
    else {
        let code = 1;
        process.on('exit', (code) => {
            console.error(new Error("Usage: node pets.js update INDEX AGE KIND NAME. INDEX must be a number and within the range of available indexes in pets.json"));
        })
    }
} 
else if(input[2] === 'destroy'){
    if (!input[3]) {
        let code = 1;
        process.on('exit', (code) => {
            console.error(new Error("Usage: node pets.js destroy INDEX"));
        })
    } 
    else if (!isNaN(Number(input[3])) && Number(input[3]) >= 0 && Number(input[3]) < (require('./pets.json')).length){
        json.splice(Number(input[3]), 1);
        fs.writeFileSync('./pets.json', JSON.stringify(json));
        console.log(json);

    } 
    else {
        let code = 1;
        process.on('exit', (code) => {
            console.error(new Error("Usage: node pets.js destroy INDEX. INDEX must be a number and within the range of available indexes in pets.json"));
        })
    }
}
else{
    let code = 1;
    process.on('exit', (code) => {
        console.error(new Error("Usage: node pets.js [read | create | update | destroy]"));
    })
}




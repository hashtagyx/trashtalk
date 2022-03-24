const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "trashtalk",
});

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO trashtalk.sensors (latitude, longitude, fillPercent) VALUES (1.0, 1.0, 50);"
    db.query(sqlInsert, (err, result) => {
        res.send("hello zz");
    })
})

app.listen(3001, () => {
    console.log("running on port 3001");
})
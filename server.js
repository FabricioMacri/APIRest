const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const cors = require('cors');

const routes = require("./routes");

const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host : "localhost",
    port : 3306,
    user : "root",
    password : "Elmaster0192837465",
    database : "e-commerce"
}


app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

// routes -------------------------------------------
app.get('/prueba', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/items', routes)
//app.use('/search/categories', routes)
app.get('/search/categories', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT category FROM `e-commerce`.products', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
app.get('/api/:category', routes)


// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})
const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const cors = require('cors');

const routes = require("./routes");

const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host : "srv1073.hstgr.io",
    port : 3306,
    user : "u284866064_admin",
    password : "Elmaster0192837465",
    database : "u284866064_coopedatabase"
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

        conn.query('SELECT DISTINCT category, subCategory FROM u284866064_coopedatabase.products;', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
app.get('/item/:id', routes)
app.get('/api/:category', routes)


// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})
const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const logger = require("morgan");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

//Public Key: TEST-6fafd896-d448-40fe-947e-a63312ae1276

app.use(logger("dev"));
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set('port', process.env.PORT || 9000);
/*
const dbOptions = {
    host : "192.168.0.15",
    port : 3306,
    user : "Admin",
    password : "Elmaster0192837465",
    database : "e-commerce"
}
*/
// routes -------------------------------------------
app.get('/prueba', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/', routes);
app.get('/items', (req, res)=>{
    const conexion = mysql.createConnection({

    host : "srv1073.hstgr.io",
    port : 3306,
    user : "u284866064_admin",
    password : "Elmaster0192837465",
    database : "u284866064_coopedatabase"

  });
    
    conexion.query('SELECT * FROM products', (err, data) => {
        if (err) {
          console.error('Error al realizar la consulta:', err);
          throw err;
        }
        conexion.end((err) => {
          if (err) {
            console.error('Error al cerrar la conexión a la base de datos:', err);
            throw err;
          }
          console.log('Conexión a la base de datos cerrada');
        });
        res.json(data);
        console.log("Se hizo una consulta.");
      });
})
//app.use('/search/categories', routes)
app.get('/search/categories', (req, res)=>{
    const conexion = mysql.createConnection({

        host : "srv1073.hstgr.io",
        port : 3306,
        user : "u284866064_admin",
        password : "Elmaster0192837465",
        database : "u284866064_coopedatabase"
    
      });
        
        conexion.query('SELECT DISTINCT category, subCategory FROM products;', (err, data) => {
            if (err) {
              console.error('Error al realizar la consulta:', err);
              throw err;
            }
            conexion.end((err) => {
              if (err) {
                console.error('Error al cerrar la conexión a la base de datos:', err);
                throw err;
              }
              console.log('Conexión a la base de datos cerrada');
            });
            res.json(data);
            console.log("Se hizo una consulta.");
          });
}) 
app.get('/item/:id', routes)
app.get('/api/:category', routes)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})

module.exports = app;


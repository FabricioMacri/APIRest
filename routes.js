const express = require("express");
const mysql = require("mysql");
const routes = express.Router();


routes.get('/item/:id', (req, res)=>{
    const conexion = mysql.createConnection({

        host : "srv1073.hstgr.io",
        port : 3306,
        user : "u284866064_admin",
        password : "Elmaster0192837465",
        database : "u284866064_coopedatabase"
    
      });
        
        conexion.query('SELECT * FROM products WHERE ID = ?', [req.params.id], (err, data) => {
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
routes.get('/api/:category', (req, res)=>{
    const conexion = mysql.createConnection({

        host : "srv1073.hstgr.io",
        port : 3306,
        user : "u284866064_admin",
        password : "Elmaster0192837465",
        database : "u284866064_coopedatabase"
    
      });
        
        conexion.query('SELECT * FROM products WHERE category = ?', [req.params.category], (err, data) => {
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

const PaymentController = require("./controllers/paymentControllers");
const PaymentService = require("./services/paymentService");

const PaymentInstance = new PaymentController(new PaymentService());

routes.get("/", function (req, res, next) {
  return res.json({
    "/payment": "generates a payment link",
    "/subscription": "generates a subscription link"
  });
});

routes.post("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});


routes.get("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});



module.exports = routes;
const express = require("express");

const routes = express.Router();


/*routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM `e-commerce`.products', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
/*routes.get('/categories', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT category FROM `e-commerce`.products', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})*/
routes.get('/item/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM `e-commerce`.products WHERE ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.get('/api/:category', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM `e-commerce`.products WHERE category = ?', [req.params.category], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
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
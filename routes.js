const express = require("express");

const routes = express.Router();


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM products', (err, rows)=>{
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
routes.get('/api/:category', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM `e-commerce`.products WHERE category = ?', [req.params.category], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

module.exports = routes;
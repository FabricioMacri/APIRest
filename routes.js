const express = require("express");

const routes = express.Router();


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM u284866064_coopedatabase.products', (err, rows)=>{
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
        
        conn.query('SELECT * FROM u284866064_coopedatabase.products WHERE ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.get('/api/:category', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM u284866064_coopedatabase.products WHERE category = ?', [req.params.category], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

module.exports = routes;
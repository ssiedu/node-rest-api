const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'root',
  database: 'nodedata'
});

 ``
//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

   
//update product
app.put('/api/products/',(req, res) => {
  var sql = "UPDATE product SET name=? , price=? where code=?";
  var data=[req.body.name,req.body.price,req.body.code];
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete product
app.delete('/api/products/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE code="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new product
app.post('/api/products',(req, res) => {
  //var data = {product_name: req.body.product_name, product_price: req.body.product_price};
  console.log(req.body.code);
  console.log(req.body.name);
  console.log(req.body.price);
  var data=[req.body.code,req.body.name,req.body.price];
  var sql = "INSERT INTO product values(?,?,?)";
  var query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
  //show all products
app.get('/api/products',(req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
      //if(err) throw err;
      res.send(JSON.stringify({results}));
    });
  });

  //show single product
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE code="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

  //Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });
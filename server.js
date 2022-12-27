var express = require('express');
var ejs = require('ejs');
var port = 8080;
var app = express();
const Pool = require('pg').Pool
var cors = require('cors')
const bodyParser = require("body-parser");    
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
var helper = require('./helper');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'attom',
  password: 'newpass',
  port: 5432,
})

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to postgreSQL");
});

app.get("/", (req, res) => {
  res.sendFile("./index.html", {
      root: __dirname,
  });
});

app.post('/climate', (req, res) => {
let addr = ''
if(req.body.addressC){
  addr = req.body.addressC.toUpperCase()
}
  let sql = ``
  if(req.body.zipCode && req.body.addressC === ''){
    sql = `select * from climate where propertyaddresszip = '${req.body.zipCode}'`
  } else if(req.body.addressC && req.body.zipCode === ''){
    sql = `select * from climate where (propertyaddressfull LIKE '${addr}%' OR propertyaddressfull LIKE '%${addr}%' OR propertyaddressfull LIKE '%${addr}');`
  } else if(req.body.zipCode && req.body.addressC){
    sql = `select * from climate where propertyaddresszip = '${req.body.zipCode}' AND (propertyaddressfull LIKE '${addr}%' OR propertyaddressfull LIKE '%${addr}%' OR propertyaddressfull LIKE '%${addr}');`
  }
  // console.log('Query',sql)
  pool.query(sql, (err, results) => {
      if (err) {
          throw err;
      } else {
        // res.json(results.rows);
        setTimeout(()=>{
          res.render("Main", {
            path: results.rows,
            helper:helper
          });
        })
      }
  })
})

app.listen(port, () => {
  console.log('Server Started')
  console.log(`Listening to port ${port}`)
});

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
  addr = req.body.addressC
  // addr = req.body.addressC.toUpperCase()
}
console.log('More than 1 word? ',addr.trim().indexOf(' ') != -1 )

// select * from climate where to_tsvector(propertyaddressfull) @@ to_tsquery('INCA')
  let sql = ``
  let asql
  if(req.body.zipCode && req.body.addressC === ''){
    sql = `select * from climate where propertyaddresszip = '${req.body.zipCode}'`
  } else if(req.body.addressC && req.body.zipCode === ''){
    sql = `select * from climate where propertyaddressfull ILIKE '${addr}%' OR propertyaddressfull ILIKE '%${addr}%' OR propertyaddressfull ILIKE '%${addr}';`
    asql = `select * from climate where to_tsvector(propertyaddressfull) @@ to_tsquery('${req.body.addressC}')`
  } else if(req.body.zipCode && req.body.addressC){
    sql = `select * from climate where propertyaddresszip = '${req.body.zipCode}' AND (propertyaddressfull ILIKE '${addr}%' OR propertyaddressfull ILIKE '%${addr}%' OR propertyaddressfull ILIKE '%${addr}');`
    asql = `select * from climate where to_tsvector(propertyaddressfull) @@ to_tsquery('${req.body.addressC}') and propertyaddresszip = '${req.body.zipCode}' AND (to_tsvector(propertyaddressfull) @@ to_tsquery('${req.body.addressC}'));`
  }
  console.log('Query',sql)

  pool.query(sql, (err, results) => {
      if (err) {
          throw err;
      } else {
        setTimeout(()=>{
          console.log(results.rows.length)
          // res.json(results)
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

const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const mysql = require('mysql')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cisco123!@#",
    database: "waitlist"
});



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readFile('./views/users.ejs' , function(err,data){
        res.writeHead(200, {'Context-type': 'text/html'});
        res.write(data);
        return res.end();
      })
})

app.post('/submit' , function(req,res) {
    console.log(req.body);


})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
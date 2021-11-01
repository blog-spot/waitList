const express = require('express')
const app = express()
// changes.. heroku push
const port = process.env.port || 3000;
const fs = require('fs')
const mysql = require('mysql')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true })); 

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images' , express.static(__dirname + 'public/images'))

// connceting to the waitlist databse

var connnetion = mysql.createConnection({
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
// posts to the sql databse
app.post('/submit' , function(req,res) {
    var email=req.body.email
    res.write('You sent your email! You have been added to the waitlist!' + req.body.email);
    connnetion.query("INSERT INTO waiters (email)  VALUES ('"+email+"')"), function(err , result) {
        if(err)
            throw err;
    }
    res.end()
 
});



app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
  console.log(`server is running`)
});
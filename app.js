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
    host: "dev-gram.database.windows.net",
    user: "Udhay",
    password: "cisco123!@#",
    database: "devgram"
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
    connnetion.query("INSERT INTO [dbo].[users] (email)  VALUES ('"+email+"')"), function(err , result) {
        if(err)
            throw err;
    }
    res.end()
 
});


// writing api functions here.



app.listen(process.env.PORT || port, '0.0.0.0', () => {
  console.log(`server is running`)
});
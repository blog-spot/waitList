const express = require('express')
const app = express()
// changes.. heroku push
const port = process.env.port || 3000;
const fs = require('fs')
const sql = require('mssql')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
// azure dev
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images' , express.static(__dirname + 'public/images'))

// connceting to the waitlist databse


// var dbConfig = {
//     server: "dev-gram.database.windows.net", // Use your SQL server name
//     database: "devgram", // Database to connect to
//     user: "Udhay", // Use your username
//     password: "cisco123!@#", // Use your password
//     port: 1433,
//     // Since we're on Windows Azure, we need to set the following options
//     options: {
//           encrypt: true
//       }
//    };
// function Conncet(){
       
//     var conn = new sql.ConnectionPool(dbConfig);
   
//     conn.connect(
//         function (err) { 
//         if (err) { 
//             console.log("!!! Cannot connect !!! Error:");
//             throw err;
//         }
//         else
//         {
//            console.log("Connection established.");
//         }
//     });


     
//     });
    
   
//       }
   
//    Conncet();
   


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readFile('./views/users.ejs' , function(err,data){
        res.writeHead(200, {'Context-type': 'text/html'});
        res.write(data);
        return res.end();
    })
})


// posts to the sql databse
app.post('/submit' , (req,res) => {
    var email=req.body.email
    res.write('You sent your email! You have been added to the waitlist!' + req.body.email);
    // conn.query("INSERT INTO [dbo].[users] (email)  VALUES ('"+email+"')"), function(err , result) {
    //     if(err)
    //         throw err;
    // }
    res.end()
})






// writing api functions here.



app.listen(port)
console.log("server running." , port);
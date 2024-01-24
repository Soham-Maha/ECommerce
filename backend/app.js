const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = 5000;
const dbconnection = require("./config/DBconnection.js");
const cookieparser = require('cookie-parser');
const cors = require('cors')

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());

app.use(cors({origin: true, credentials: true}))

app.get('/',(req,res)=>{
    res.send("Hello World!")
});

//connect to the database mongodb
dbconnection();

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port : ${PORT}`)
})


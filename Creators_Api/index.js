const express=require('express')
require('dotenv').config();
require('./src/db/mongodb')
const app=express()
const port=3001
const Userroute =require('./src/routers/user')
const Donateroute=require('./src/routers/donation')
app.use(express.json())
app.use(Userroute)
app.use(Donateroute)
app.listen(port, () => {
    console.log('App listening on port 3000!');
});

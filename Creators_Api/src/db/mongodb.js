require('dotenv').config();
const mongo=require('mongoose')
const link=process.env.password
mongo.connect(link)
    .then(function(result){
        console.log("connected");
    })
    .catch((err)=>
    {
        console.log(err);
    })

const  jwt=require('jsonwebtoken')
const mongo=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const donateSchema=new mongo.Schema(
    {
        recevier:{
            type:String,
            trim:true,
        },
        currency:{
            type:String,
            minlength:1
        },
        amount:{
            type:Number
        },
        username:{
            type:String
        },
        message:{
            type:String,
            trim:true
        },
    },
)
const Donate=mongo.model('Donate',donateSchema)
module.exports=Donate
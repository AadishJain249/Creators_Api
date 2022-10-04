const express =require('express')
const route=new express.Router()
const Donate=require('../models/donate')
const auth=require('../middleware/auth')
const User = require('../models/user')
//only person who is logged in can call it
route.post('/donate',auth,async function (req, res) {
        try {
            const donate = new Donate(req.body)
            const user = User.findOne({name:req.body.recevier})
            if(req.body.currency!=='$')
            {
                res.send('invalid currency')
            }
            else if(!user){
              res.send('User doesnt exist')
            }
            else {
                await donate.save()
                res.send(donate)  
            }
            }
            catch(error) {
            res.send(error.message)
        }
    })
module.exports=route
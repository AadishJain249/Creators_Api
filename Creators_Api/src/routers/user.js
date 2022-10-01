const express =require('express')
const multer=require('multer')
const route=new express.Router()
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')
route.get('/hello/me', auth, async (req,res) => {
    res.send(req.user);
});
//signup
route.post('/hello', async(req, res) => {
    try{
        const user=new User(req.body) //name,pass,confirm
        const token=await user.genToken()  
        if(req.body.password!==req.body.Confirmpassword)
        {
            res.send('Password and ConfirmPassword did not match...')
        }
        else
        {
            await user.save()
            res.send({user,token})   
        }
        
    }
    catch(err)
    {
        res.status(500).send(err)

    }
});
route.post('/hello/login',async(req,res)=>{
    try
    {
        const user=await User.findUser(req.body.email,req.body.password)
        const token=await user.genToken()  
        res.status(200).send({user,token})
    }
    catch(err)
    {
        res.status(400).send()
    }
})

route.post('/hello/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

module.exports=route
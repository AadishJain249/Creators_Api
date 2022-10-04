const express =require('express')
const multer=require('multer')
const route=new express.Router()
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')
const sharp=require('sharp')

route.get('/users', auth, async (req,res) => {
    console.log(req.user.tokens.length);          
    res.status(200).send(req.user);
});

route.get('/paginted',auth,async function(req, res) {
    try{
        let limit = parseInt(req.query.limit);
        const post = await User.find().populate().limit(limit)
        console.log(post);
        res.send(post)
    }
    catch (error) {
    }
});

const upload = multer({                                                             
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            console.log("working");
            return cb(new Error('Please upload a jpg, jpeg or png file '));
        }
        cb(undefined,true);
    }                                                  
});
route.post('/picture',auth, upload.single('profilepic'),async(req,res) => {               
    const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer();
    req.user.profilepic =buffer;                                
    
    await req.user.save();
    res.send('image uploaded succefully')
}, (error,req,res,next) => {
    res.status(500).send({ error:error.message });
});

//signup
route.post('/signup', async(req, res) => {
    const user=new User(req.body) 
    try{
        const token=await user.genToken()  
        await user.save()
        res.send({user,token})   
        } 
        catch(err){
        res.status(500).send(err.message)}
    });

//Login
route.post('/login',async(req,res)=>{
    try
    {
        const user=await User.findUser(req.body.name,req.body.password)
        const token=await user.genToken()
        console.log(user.tokens.length);  
        res.status(200).send({user,token})
    }
    catch(err)
    {
        res.status(400).send()
    }
})

// Logout user
route.post('/logout', auth, async (req,res) => {
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
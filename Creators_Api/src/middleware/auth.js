// const jwt=require('jsonwebtoken')
// const User=require('../models/user')
// const auth=async (req,res,next)=>{
//     try {
//         const token=req.header('Authorization').replace('Bearer ','')
//         console.log(token);
//         const decode=jwt.verify(token ,'AadishJain') // it is to verify the name of token
//         console.log(decode._id);
//         const user=await User.findOne({_id:decode._id,'tokens.token':token})
//         if(!user)
//         {
//             throw new Error('pls authentciate')
//         }
//         req.token=token
//         req.user=user
//         next()
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
// module.exports=auth
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // console.log(token);
        const decoded = jwt.verify(token,'AadishJain');
        console.log(decoded);
        const user = await User.findOne({ id: decoded._id, 'tokens.token': token });            //search the user that has the _id and one of the elements(token) in the tokens array has the token initialized above

        if(!user) {
            throw new Error();
        }
        
        req.token = token;
        req.user = user;
        next();
        //console.log(token);
    } catch(e) {
        res.status(401).send({ error: 'Please authenticate.'});
    }

    // console.log('auth middleware');
    // next();
};

module.exports = auth;
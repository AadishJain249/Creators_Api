const  jwt=require('jsonwebtoken')
const mongo=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const userSchema=new mongo.Schema(
    {
        name:{
            type:String,
            trim:true,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength:7,
            validate(value)
            {
                if(value.toLowerCase().includes('password'))
                {
                    throw new Error('wrong password')
                }
            }
        },
        Confirmpassword:{
            type:String,
            required:true,
            trim:true,
            minlength:7,
            validate(value)
            {
                if(value.toLowerCase().includes('password'))
                {
                    throw new Error('wrong password')
                    
                }
            }
        },

        tokens:
        [{
           token:{
            type:String,
            require:true
           }
        }],

    },
        {
            timestamps:true
        }
)
userSchema.methods.toJSON=function()
{
    const user=this
    const userData=user.toObject()
    delete userData.password
    delete userData.Confirmpassword
    delete userData.tokens
    return userData
}
userSchema.methods.genToken=async function()
{
    const user=this
    const token=await jwt.sign({_id:user._id.toString()},'AadishJain')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
// for login
userSchema.statics.findUser=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user)
    {
        throw new Error('unable to login')
    }
    const pass=await bcrypt.compare(password,user.password)
    if(!pass)
    {
        throw new Error('unable to login')
    }
    return user
}
// hashing our password
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8 )
        user.Confirmpassword=await bcrypt.hash(user.Confirmpassword,8 )
    }
    next()
})
const User=mongo.model('User',userSchema)
module.exports=User
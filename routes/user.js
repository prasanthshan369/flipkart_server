const router=require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User = require('../models/user')
const VerifyAccount = require('../middlewares/VerifyToken')
router.get('/',(req,res)=>{
    res.json("user router working")
})

router.post('/signup',async(req,res)=>{
    const salt=await bcrypt.genSalt(10)
    const passwordHash=await bcrypt.hash(req.body.password,salt)
    const user=await User.create({
        email:req.body.email,
        password:passwordHash
    })
    const token=await jwt.sign({userId:user._id},process.env.SECRET_KEY)
    res.json({token})
})
router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body);
    const result=await User.findOne({email:email})
    if(result){
        bcrypt.compare(password,result.password).then((passwordResult)=>{
            if(passwordResult==true){
                jwt.sign({userId:result._id},process.env.SECRET_KEY,(err,token)=>{
                    if(err)console.log(err);
                    res.status(200).json({success:true,msg:"Login Successfully",token})
                })
            }else{
                res.status(401).json({success:false,msg:"Incorrect Password"})
            }
        })

    }else{
        res.status(401).json({status:false,msg:"User Not Register"})

    }

})
router.get('/data',VerifyAccount,async(req,res)=>{
     const data=await User.findById(req.userId).select(' -password')
                if(data){
                    res.json(data)
                }else{
                    res.status(401)
                }
})

module.exports=router
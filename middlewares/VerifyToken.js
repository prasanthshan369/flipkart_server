const jwt=require('jsonwebtoken')
const User = require('../models/user')

function VerifyAccount(req,res,next){
    const token=req.headers['authorization']
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,async(err,decodedToken)=>{
            if(err){
                res.status(401).json({msg:"Access denied"})
            }else{
                req.userId=decodedToken.userId
                next()
            }

        })
    }
}

module.exports=VerifyAccount
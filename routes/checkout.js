const router=require('express').Router()
const {v4:uuid}=require('uuid')
const Checkout = require('../models/checkout')
const VerifyAccount = require('../middlewares/VerifyToken')
const stripe=require('stripe')(process.env.STRIPE_KEY)
router.get('/',(req,res)=>{
    res.json("checkout router working")
})
router.post('/create-payment-intent',VerifyAccount,async(req,res)=>{
    const {total,items}=req.body
    const OrderId=uuid()
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total*100,
        currency:"inr",
        metadata:{
            order_id:OrderId
        }
    })
    const checkout=await Checkout.create({
        items:items,
        total:total,
        order_id:OrderId,
        payment_id:paymentIntent.id,
        user:req.userId
    })
    res.json({clientSecret:paymentIntent.client_secret})
})

router.get('/orders',VerifyAccount,async(req,res)=>{
    const orders=await Checkout.find({user:req.userId})
    res.json({orders})
})

module.exports=router
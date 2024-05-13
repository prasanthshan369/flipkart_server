const mongoose=require('mongoose')

const CheckoutSchema=mongoose.Schema({
    items:[
        new mongoose.Schema({
            url:String,
            Sellingprice:String,
            rating:String,  
            Product:String
        })
    ],
    total:Number,
    payment_id:String,
    order_id:String,
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true}
)
const Checkout=mongoose.model("checkouts",CheckoutSchema)
module.exports=Checkout
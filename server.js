const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
require('./config/db')
app.use(express.json())
app.use(cors())
const apiRouter=require('./routes')
app.use('/',apiRouter)


app.listen(5000,()=>{
    console.log('server is up and running');
})
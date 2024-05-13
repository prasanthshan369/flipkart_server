const mongoose=require('mongoose')
const DB_URL='mongodb+srv://prasanthshan0123:qfP9WcdyA9zAibxf@cluster0.wyevgit.mongodb.net/e_commerce'


mongoose.connect(DB_URL).then((db)=>{
    console.log("db Connected Host :"+db.connection.host);
}).catch((err)=>{
    console.log(err);
})
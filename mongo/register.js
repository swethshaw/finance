const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/dineroSR")
.then(()=>{
    console.log("Connection successful with the database");
}).catch((err)=>{
    console.log(`No connection found ${err}`);
})
const client= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    contact:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String, 
        required: true ,  
        unique : true,
        trim:true
    },
    password:{
        type: String, 
        required: true , 
        trim:true
    }
})
const Client1 = mongoose.model("Register",client);
module.exports = Client1;

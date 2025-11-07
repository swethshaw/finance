const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/dineroSR")
.then(()=>{
    console.log("Connection successful with the database");
}).catch((err)=>{
    console.log(`No connection found ${err}`);
})
const feed= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String, 
        required: true ,  
        trim:true
    },
    Feedback:{
        type: String, 
        required: true ,  
        trim:true
    },
    Remark:{
        type: String, 
        required: true ,  
        trim:true
    }
})
const Clientfeed1 = mongoose.model("feedback",feed);
module.exports = Clientfeed1;
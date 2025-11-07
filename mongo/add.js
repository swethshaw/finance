const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/dineroSR")
.then(()=>{
    console.log("Connection successful with the database");
}).catch((err)=>{
    console.log(`No connection found ${err}`);
})
const addschema = new mongoose.Schema({
    userId:{
        type:String,  
        required:true,
        unique:true,
        trim:true
    },
    dates: {
        type: [Date], 
        default: []   
      },
      totals: {
        type: [Number], 
        default: []     
      }
})
const Clientadd1 = mongoose.model("Add",addschema);
module.exports = Clientadd1;
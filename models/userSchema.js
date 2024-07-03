const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    profile:{
        type:String,
        default:""
    },

},{timestamps:true});

module.exports=mongoose.model('User',userSchema);
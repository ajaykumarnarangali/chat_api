const mongoose=require('mongoose');

module.exports.connection=async()=>{
    try {
        mongoose.connect('mongodb://0.0.0.0:27017/Chatapp');
        console.log("connection succesfull")
        
    } catch (error) {
        console.log(("connection failed"))
    }
}
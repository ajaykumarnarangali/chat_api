const User=require('../models/userSchema');
const {errorHandler}=require('../utils/errorHandler');

module.exports.getUsersForSidebar=async(req,res,next)=>{
    try {
        const loggInUserId=req.user.id;

        const users=await User.find({_id:{$ne:loggInUserId},
        ...(req.query.searchTerm && {username:{$regex:req.query.searchTerm,$options:'i'}})},{password:0});

        res.status(200).json({users})
        
    } catch (error) {
        next(error)
    }
}
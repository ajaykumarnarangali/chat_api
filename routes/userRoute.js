const router=require('express').Router();
const userController=require('../controllers/userController');
const {verify}=require('../utils/verify');

router.get('/',verify,userController.getUsersForSidebar);


module.exports=router
const router=require('express').Router();
const authController=require('../controllers/authController');

router.post('/register',authController.Register)
router.post('/login',authController.Login)
router.get('/sign-out',authController.signOut)


module.exports=router
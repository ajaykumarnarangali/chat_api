const router=require('express').Router();
const messageController=require('../controllers/messageController');
const {verify}=require('../utils/verify');

router.get('/:id',verify,messageController.getMessage);
router.post('/send/:id',verify,messageController.sendMessage);



module.exports=router
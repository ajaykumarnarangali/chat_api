const express=require('express');
// const app=express();
const cors=require('cors');
require('dotenv').config();
const cookieParser=require('cookie-parser');
const {connection}=require('./models/connection');
const {app,server}=require('./socket/socket');

const authRouter=require('./routes/authRoute');
const userRouter=require('./routes/userRoute');
const messageRouter=require('./routes/messageRouter');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT=process.env.PORT || 4000;

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/message',messageRouter);

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        success:false,
        message:err.message
    })
})

connection()
server.listen(PORT,()=>{
    console.log("server running successfully");
})
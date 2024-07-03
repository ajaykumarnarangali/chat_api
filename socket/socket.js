const {Server}=require('socket.io');
const http=require('http');
const express=require('express');
const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET','POST']
    } 
})

const connectedUsers={}//{userId:socket.id} ee type il save cheyyan nokkunn

const getRecieverSocketId=(recieverId)=>{
    return connectedUsers[recieverId]
}

io.on('connection',(socket)=>{

    // console.log("userconnected",socket.id)

    //geting userId of connected user
    const userId=socket.handshake.query.userId

    if(userId!='undefined'){
        connectedUsers[userId]=socket.id
    }

    //when user connected to socket immediatly it send userlist to all users with the key Active_users
    io.emit('Active_users',Object.keys(connectedUsers))
    
    socket.on('disconnect',()=>{
        // console.log("socket disconnected",socket.id)
        //when the user disconnected it remove from the connected user object
        delete connectedUsers[userId];
        //when connected user deleted then one deleted from object and formed new object immediatly it send to all users
        io.emit('Active_users',Object.keys(connectedUsers))
    })
})


module.exports={app,io,server,getRecieverSocketId}
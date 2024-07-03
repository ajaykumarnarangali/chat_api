const Message = require('../models/messageSchema');
const Conversation = require('../models/conversationSchema');
const { getRecieverSocketId, io } = require('../socket/socket');

module.exports.sendMessage = async (req, res, next) => {
    try {
        const { id: recieverId } = req.params;
        const { message } = req.body;
        const senderId = req.user.id;

        //first we need to check any conversation between sender and reciever.we need to send message to reciever .so if there is no 
        // conversation first create it .other wise update it
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        //if there is no conversation creating new conversation
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recieverId]
            })
        }

        //create sending messages
        const newMessage = new Message({
            senderId, recieverId, message
        })

        //if there is any message push that message into message array  inside converstation schema
        if (newMessage) {
            conversation.messages.push(newMessage);
        }

        //this will not run parallel.first message save then conversation will save
        // await newMessage.save();
        // await conversation.save();


        //this will run parallel
        await Promise.all([newMessage.save(), conversation.save()])


        //==========================================>TO MAKE IT REAL TIME NEED SOCKET.IO <=================//

        const recieverSocketId = getRecieverSocketId(recieverId)
    
        console.log(recieverSocketId)
    
        if (recieverSocketId) {
            io.to(recieverSocketId).emit('messages', newMessage)
        }

        res.status(200).json({ message: newMessage })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports.getMessage = async (req, res, next) => {
    try {

        const senderId = req.user.id;
        const { id: userTochatId } = req.params;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userTochatId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        // await Message.updateMany({senderId,recieverId:userTochatId,isRead:true});

        res.status(200).json(messages);


    } catch (error) {
        console.log(error)
        next(error)
    }
}
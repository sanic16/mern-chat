const Conversation = require('./../models/conversationModel')
const Message = require('./../models/messageModel')

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        if(!message){
            return res.status(400).json({error: 'Message is required'})
        }

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],                
            })
        }

        const newMessage = await Message.create({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await Promise.all([newMessage.save(), conversation.save()])

        await conversation.save()


        console.log(newMessage)
        return res.status(201).json(newMessage)

    } catch (error) {
        console.log(`Error in sendMessage Controller: ${error.message}`)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

const getMessages = async(req, res) => {
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate('messages') // populate the messages field in conversation

        if(!conversation){
            return res.status(200).json([])
        }

        

        return res.status(200).json(conversation.messages)
    } catch (error) {
        console.log(`Error in getMessages Controller: ${error.message}`)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}


module.exports = {
    sendMessage,
    getMessages
}
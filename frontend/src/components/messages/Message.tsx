import useAuthContext from "../../hooks/useContextProvider"
import { extractTime } from "../../utils/extractTime"
import useConversation from "../../zustand/useConversation"

const Message = (
    {
        message
    }:{
        message: Message
    }
) => {
    const {
        authUser
    } = useAuthContext()
    const {
        selectedConversation
    } = useConversation()


  const fromMe = message.senderId === authUser._id
  const formattedDate = extractTime(message.createdAt)
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '' 
  const shakeClass = message.shouldShake ? 'shake' : '' 
   
  
  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img 
                    src={profilePic}
                    alt="Tailwind CSS chat bubble component"
                />
            </div>
        </div>
        <div className={`chat-bubble text-white ${shakeClass} ${bubbleBgColor}`}>
            { message.message }
        </div>
        <div className="chat-footer opacity-50 text-sx flex gap-1 items-center">
            { formattedDate }
        </div>
    </div>
  )
}

export default Message
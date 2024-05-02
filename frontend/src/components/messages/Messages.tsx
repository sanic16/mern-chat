import { useEffect, useRef } from "react"
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton"
import Message from "./Message"
import useConversation from "../../zustand/useConversation"
import useListenMessages from "../../hooks/useListenMessages"

const Messages = () => {
  const {
    loading,
    messages
  } = useGetMessages()

  useListenMessages()

  const lastMessageRef = useRef<HTMLDivElement>(null)
  const {
    selectedConversation
  } = useConversation()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    
    }, 100)
  }, [selectedConversation?._id, messages.length])

  return (
    <div className='px-4 flex-1 overflow-auto'>
        {
          loading ? (
            [...Array(3)].map((_, idx) => (
              <MessageSkeleton key={idx} /> 
            ))
          ) : (
            messages.length === 0 ? (
              <p className="text-center">
                  Send a message to start a conversation
              </p>
            ): (
              messages.map((message) => {
                const lastMessage = messages[messages.length - 1]
                if(message === lastMessage){
                  return(
                    <div key={message._id} ref={lastMessageRef}>
                      <Message message={message} />  
                    </div>
                  ) 
                }else{
                  return(
                    <Message key={message._id} message={message} />
                  )
                }
                
              })
            )
          )
        }   
    </div>
  )
}

export default Messages
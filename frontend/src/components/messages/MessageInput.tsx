import { useState } from "react"
import { BsSend } from "react-icons/bs"
import useSendMessages from "../../hooks/useSendMessages"
import toast from "react-hot-toast"

const MessageInput = () => {
  
  const [message, setMessage] = useState('')     

  const {
    loading,
    sendMessage
  } = useSendMessages()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!message.trim()) return
    try {
        await sendMessage(message)
        setMessage('')
    } catch (error: unknown) {
        if(error instanceof Error){
            toast.error(error.message)
        }
    }
  }  

  return (
    <form 
        onSubmit={handleSubmit}
        className="px-4 my-3"
    >
        <div className="w-full relative">
            <input
                type="text"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                placeholder="Send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                disabled={loading}
                type="submit"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
               { loading ? <span className="loading loading-spinner mx-auto"></span> : <BsSend />} 
            </button>
        </div>
    </form>
  )
}

export default MessageInput
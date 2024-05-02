import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const {
    messages,
    setMessages,
    selectedConversation
  } = useConversation()  

  useEffect(() => {
    const getMessages = async() => {
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/${selectedConversation?._id}`)
            const data = await res.json()
            if(!res.ok || data.error){
                throw new Error(data.error)
            }
            setMessages(data)
        } catch (error: unknown) {
            if(error instanceof Error){
                toast.error(error.message)
            }
        }finally {
            setLoading(false)
        }
    }
    if(selectedConversation?._id){
        getMessages()
    }
  }, [setMessages, selectedConversation?._id])

  return {
    loading,
    messages
  }
}

export default useGetMessages
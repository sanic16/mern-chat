import { useState } from "react"
import toast from "react-hot-toast"
import useAuthContext from "./useContextProvider"

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {
        setAuthUser,
    } = useAuthContext()


    const login = async(
        username: string,
        password: string
    ) => {
        setLoading(true)
        const success = handleInputErrors({username, password})
        if(!success) return
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            }) 
            
            const data = await res.json()
            if(!res.ok || data.error){
                throw new Error(data.error)
            }
            setAuthUser(data)
        } catch (error: unknown) {
            if(error instanceof Error){
                toast.error(error.message)
            }
        }finally{
            setLoading(false)
        }
    }
    
    return {
        loading,
        login
    }
}

export default useLogin

const handleInputErrors = (
    {        
        username, 
        password
        
    }:{
        username: string,
        password: string        
    }
) => {
    if(!username || !password){
        toast.error("Please fill in all fields")
        return false
    }
    
    if(password.length < 6){
        toast.error('Password must be at least 6 characters long')
        return false
    }

    return true
}
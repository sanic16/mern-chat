import { useState } from "react"
import toast from "react-hot-toast"
import useAuthContext from "./useContextProvider"

const useSignUp = () => {

    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async (inputs: {
        fullName: string,
        username: string,
        password: string,
        confirmPassword: string,
        gender: string
    }) => {
        setLoading(true)
        const success = handleInputErrors(inputs)
        if(!success) return

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json()
            if(!res.ok || data.error){
                throw new Error(data.error)
            }else{
                toast.success('Account created successfully')
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
        signup
    }
   
}

export default useSignUp


const handleInputErrors = (
    {
        fullName, 
        username, 
        password, 
        confirmPassword, 
        gender
    }:{
        fullName: string,
        username: string,
        password: string,
        confirmPassword: string,
        gender: string
    }
) => {
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields")
        return false
    }
    if(password !== confirmPassword){
        toast.error("Passwords do not match")
        return false
    }
    if(password.length < 6){
        toast.error('Password must be at least 6 characters long')
        return false
    }

    return true
}
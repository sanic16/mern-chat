import { useState } from "react";
import useAuthContext from "./useContextProvider";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { 
        logout: unaunthenticate  
    } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            if(!res.ok || data.error){
                throw new Error(data.error)
            }
            unaunthenticate()
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
        logout
    }
}

export default useLogout
import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
    authUser: {
        _id: string,
        fullName: string,
        username: string,
        profilePic: string
    },
    setAuthUser: (authUser: AuthContextType['authUser']) => void,
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    authUser: {
        _id: '',
        fullName: '',
        username: '',
        profilePic: ''
    },
    setAuthUser: () => {},
    logout: () => {}
})

const AuthContextProvider = (
    {
        children
    }:{
        children: React.ReactNode
    }
) => {
    const [authUser, setAuthUser] = useState<AuthContextType['authUser']>(JSON.parse(localStorage.getItem('chat-user') || '{}'))

    const handleSetAuthUser = (authUser: AuthContextType['authUser']) => {
        setAuthUser(authUser)
        localStorage.setItem('chat-user', JSON.stringify(authUser))
    }

    const logout = () => {
        setAuthUser({
            _id: '',
            fullName: '',
            username: '',
            profilePic: ''
        })
        localStorage.removeItem('chat-user')
    }

    useEffect(() => {
       const user = localStorage.getItem('chat-user') ? 
       JSON.parse(localStorage.getItem('chat-user') || '{}') :
       { _id: '', fullName: '', username: '', profilePic: '' }

       setAuthUser(user)
    }, [])

    return (
        <AuthContext.Provider value={{
            authUser,
            setAuthUser: handleSetAuthUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

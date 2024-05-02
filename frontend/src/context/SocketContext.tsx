import React, { createContext, useEffect, useState } from "react";
import useAuthContext from "../hooks/useContextProvider";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
    socket: Socket | null,
    onlineUsers: string[],
    setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>

}

export const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: [],
    setOnlineUsers: () => {}
})

const SocketContextProvider = (
    {
        children
    }:{
        children: React.ReactNode
    }
) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const {
        authUser
    } = useAuthContext()

    useEffect(() => {
        if(authUser){
            const socket = io('http://localhost:8000', {
                query: {
                    userId: authUser._id
                }
            })
            setSocket(socket)

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on('getOnlineUsers', (users: string[]) => {
                setOnlineUsers(users)
                console.log(users)
            })

            console.log(onlineUsers)

            return () => {
                socket.close()
            }   
        }else{
            if(socket){
                socket.close()
                setSocket(null)    
            }
        }
        console.log('SocketContextProvider')
    }, [authUser])

    return (
        <SocketContext.Provider value={{
            socket,
            onlineUsers,
            setOnlineUsers
        }}>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketContextProvider
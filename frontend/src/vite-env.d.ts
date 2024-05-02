/// <reference types="vite/client" />


type Message = {
        _id: string,
        senderId: string,
        receiverId: string,
        message: string,
        createdAt: string,
        updatedAt: string,
        shouldShake: boolean | undefind        
 }  

 type Conversation =  {
    _id: string,
    fullName: string,
    username: string,
    gender: string
    profilePic: string,
    createdAt: string,
    updatedAt: string,
}
    
 
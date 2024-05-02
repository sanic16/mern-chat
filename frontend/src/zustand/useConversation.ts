import { create } from "zustand";

type ConversationState = {
    selectedConversation: Conversation | null,
    setSelectedConversation: (selectedConversation: Conversation | null) => void,
    messages: Message[],
    setMessages: (messages: Message[]) => void
}

const useConversation = create<ConversationState>(set => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation}),
    messages: [],
    setMessages: (messages) => set({ messages })
}))

export default useConversation
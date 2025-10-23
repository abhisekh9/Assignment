import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { ChatState, Chat, Message } from '../types/index.js';

// Predefined assistant responses
const ASSISTANT_RESPONSES = [
  "That's an interesting question! Let me help you with that.",
  "I understand what you're looking for. Here's what I can tell you:",
  "Great question! Based on your input, here's my response:",
  "Thanks for sharing that. Let me provide some insights:",
  "I've analyzed your request and here's what I found:",
];

const getRandomResponse = () => {
  return ASSISTANT_RESPONSES[Math.floor(Math.random() * ASSISTANT_RESPONSES.length)];
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChat: null,
  sidebarCollapsed: false,
  searchQuery: '',

  createNewChat: () => {
    set({ activeChat: null });
  },

  setActiveChat: (chatId: string) => {
    const chat = get().chats.find(c => c.id === chatId);
    if (chat) {
      set({ activeChat: chat });
    }
  },

  addMessage: (message) => {
    const { activeChat, chats } = get();
    const newMessage: Message = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
    };

    let updatedChat: Chat;

    if (!activeChat) {
      // Create new chat
      const chatTitle = message.content.length > 50 
        ? message.content.substring(0, 50) + '...' 
        : message.content;
      
      updatedChat = {
        id: uuidv4(),
        title: chatTitle,
        messages: [newMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set({
        chats: [updatedChat, ...chats],
        activeChat: updatedChat,
      });
    } else {
      // Update existing chat
      updatedChat = {
        ...activeChat,
        messages: [...activeChat.messages, newMessage],
        updatedAt: new Date(),
      };

      const updatedChats = chats.map(c => 
        c.id === updatedChat.id ? updatedChat : c
      );

      set({
        chats: updatedChats,
        activeChat: updatedChat,
      });
    }

    // Auto-respond from assistant if message is from user
    if (message.sender === 'user') {
      setTimeout(() => {
        const assistantMessage: Message = {
          id: uuidv4(),
          content: getRandomResponse(),
          sender: 'assistant',
          timestamp: new Date(),
        };

        const currentState = get();
        const chatToUpdate = currentState.activeChat;

        if (chatToUpdate && chatToUpdate.id === updatedChat.id) {
          const updatedChatWithResponse = {
            ...chatToUpdate,
            messages: [...chatToUpdate.messages, assistantMessage],
            updatedAt: new Date(),
          };

          const updatedChats = currentState.chats.map(c =>
            c.id === updatedChatWithResponse.id ? updatedChatWithResponse : c
          );

          set({
            chats: updatedChats,
            activeChat: updatedChatWithResponse,
          });
        }
      }, 1000);
    }
  },

  toggleSidebar: () => {
    set({ sidebarCollapsed: !get().sidebarCollapsed });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  deleteAllChats: () => {
    set({ chats: [], activeChat: null });
  },
}));

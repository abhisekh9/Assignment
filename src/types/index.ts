export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  attachments?: AttachedFile[];
}

export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  sidebarCollapsed: boolean;
  searchQuery: string;
  
  // Actions
  createNewChat: () => void;
  setActiveChat: (chatId: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  deleteAllChats: () => void;
}

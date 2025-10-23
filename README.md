# Inteliq Chat - AI Chat Interface

A modern, responsive chat application built with React, TypeScript, and Material-UI. Features an intuitive interface similar to ChatGPT with support for multiple conversations, file attachments, and real-time messaging.

## 🚀 Features

- **Real-time Chat Interface** - Instant messaging with smooth UX
- **Quick Action Cards** - Pre-defined prompts for faster interactions
- **File Attachments** - Support for drag-drop, paste, and file upload
- **Chat History** - Automatic conversation saving and management
- **Search Functionality** - Search through all your conversations
- **Collapsible Sidebar** - Responsive sidebar with navigation
- **Assistant Auto-Response** - Simulated AI responses with delay
- **Responsive Design** - Works seamlessly from desktop to tablet
- **Clean UI/UX** - Material-UI components with custom styling

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI)
- **State Management:** Zustand
- **Build Tool:** Vite
- **Icons:** Material-UI Icons
- **UUID Generation:** uuid

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
-git clone <your-repo-url>
-cd inteliq-chat
2. **Install dependencies**
-npm install
3. **Start the development server**
-npm run dev
4. **Open your browser**
Navigate to `http://localhost:5173` (or the URL shown in your terminal)


## 🎯 Key Features Implementation

### 1. Message Sending
- Type your message in the input field
- Press `Enter` to send (or `Shift + Enter` for new line)
- Click the send button to submit

### 2. File Attachments
- **Drag & Drop:** Drag files directly into the input area
- **Paste:** Copy files and paste (`Ctrl/Cmd + V`) into the input
- **Click to Upload:** Click the attachment icon to select files
- **Remove Files:** Click the minus icon to remove individual files or the bin icon to remove all

### 3. Chat Management
- **New Chat:** Click the "+ New Chat" button
- **Switch Chats:** Click any chat in the history to open it
- **Search:** Use the search bar to filter conversations
- **Auto-Save:** All conversations are automatically saved

### 4. Quick Actions
- Click any quick action card to send that message instantly


## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint


## 📄 License

This project is licensed under the MIT License.
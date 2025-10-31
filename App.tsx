import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AnimatedLogo from './components/AnimatedLogo';
import { Chat, User, Message } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const currentUser: User = {
    id: 'user_0',
    name: 'You',
    avatar: 'https://picsum.photos/seed/you/200',
    isOnline: true,
  };

  useEffect(() => {
    // Simulate initial loading and data fetching
    setTimeout(() => {
      const mockChats: Chat[] = [
        {
          id: 'chat_1',
          user: { id: 'user_1', name: 'Alice', avatar: 'https://picsum.photos/seed/alice/200', isOnline: true },
          messages: [
            { id: 'msg_1', type: 'text', text: 'Hey, how are you?', timestamp: '10:30 AM', senderId: 'user_1', status: 'read' },
            { id: 'msg_2', type: 'text', text: 'I am good, thanks! How about you?', timestamp: '10:31 AM', senderId: 'user_0', status: 'read' },
            { id: 'msg_3', type: 'text', text: 'Doing great! Just working on the new project.', timestamp: '10:31 AM', senderId: 'user_1', status: 'read' },
          ],
          unreadCount: 0,
        },
        {
          id: 'chat_2',
          user: { id: 'user_2', name: 'Bob', avatar: 'https://picsum.photos/seed/bob/200', isOnline: false, lastSeen: 'yesterday' },
          messages: [
            { id: 'msg_4', type: 'text', text: 'Did you see the latest demo?', timestamp: 'Yesterday', senderId: 'user_2', status: 'read' },
          ],
          unreadCount: 1,
        },
        {
          id: 'chat_3',
          user: { id: 'user_3', name: 'Charlie', avatar: 'https://picsum.photos/seed/charlie/200', isOnline: true },
          messages: [
            { id: 'msg_5', type: 'text', text: 'Let\'s catch up later.', timestamp: '9:00 AM', senderId: 'user_0', status: 'delivered' },
          ],
          unreadCount: 0,
        },
      ];
      setChats(mockChats);
      setActiveChatId(mockChats[0]?.id || null);
      setIsLoading(false);
    }, 2500);
  }, []);

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    // Mark messages as read
    setChats(prevChats => prevChats.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const handleSendMessage = (chatId: string, messageData: { type: 'text'; text: string } | { type: 'audio'; audioUrl: string }) => {
    const baseMessage = {
      id: `msg_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: currentUser.id,
      status: 'sent' as const,
    };

    const newMessage: Message = messageData.type === 'text' 
      ? { ...baseMessage, type: 'text', text: messageData.text }
      : { ...baseMessage, type: 'audio', audioUrl: messageData.audioUrl };

    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          return { ...chat, messages: [...chat.messages, newMessage] };
        }
        return chat;
      });

      // Simulate a reply after a short delay
      setTimeout(() => {
        const replyMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          type: 'text',
          text: 'Sounds good!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderId: chatId.replace('chat_', 'user_'),
          status: 'delivered'
        };
        setChats(currentChats => currentChats.map(chat => {
          if (chat.id === chatId) {
            return { ...chat, messages: [...chat.messages, replyMessage] };
          }
          return chat;
        }));
      }, 1500);

      return updatedChats;
    });
  };

  const activeChat = chats.find(c => c.id === activeChatId);

  if (isLoading) {
    return (
      <div className="bg-green-600 dark:bg-green-800 h-screen w-screen flex items-center justify-center">
        <AnimatedLogo />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased overflow-hidden">
      <div className="relative w-full md:w-1/3 lg:w-1/4 h-full md:flex">
         <Sidebar chats={chats} currentUser={currentUser} activeChatId={activeChatId} onSelectChat={handleSelectChat} />
      </div>
      <div className={`flex-1 w-full md:w-2/3 lg:w-3/4 h-full flex flex-col absolute md:relative top-0 left-0 transition-transform duration-300 ease-in-out ${activeChatId ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
        {activeChat ? (
          <ChatWindow chat={activeChat} currentUser={currentUser} onSendMessage={handleSendMessage} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 text-center p-4">
             <img src="https://picsum.photos/seed/welcome/400" alt="Welcome" className="w-64 h-64 rounded-full mb-8 object-cover"/>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Welcome to ChatVerse</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Select a chat to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
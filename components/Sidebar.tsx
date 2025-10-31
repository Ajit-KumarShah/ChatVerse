
import React from 'react';
import { Chat, User } from '../types';

interface SidebarProps {
  chats: Chat[];
  currentUser: User;
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, currentUser, activeChatId, onSelectChat }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0">
        <div className="flex items-center space-x-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{currentUser.name}</h2>
        </div>
        <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>
      </header>
      
      {/* Search Bar */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <input type="text" placeholder="Search or start new chat" className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>
      
      {/* Chat List */}
      <div className="flex-grow overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 ${activeChatId === chat.id ? 'bg-green-100 dark:bg-green-900/50' : ''}`}
          >
            <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-md font-semibold text-gray-800 dark:text-white truncate">{chat.user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{chat.messages[chat.messages.length - 1]?.timestamp}</p>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.messages[chat.messages.length - 1]?.text}</p>
                {chat.unreadCount > 0 && (
                  <span className="bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

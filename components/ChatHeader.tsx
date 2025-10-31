
import React from 'react';
import { User } from '../types';

interface ChatHeaderProps {
  user: User;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  return (
    <header className="p-3 sm:p-4 flex items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover mr-4" />
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user.isOnline ? 'Online' : `Last seen ${user.lastSeen}`}
        </p>
      </div>
      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
        </button>
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;

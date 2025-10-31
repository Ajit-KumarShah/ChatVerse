import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
  const alignClass = isSender ? 'self-end' : 'self-start';
  const colorClass = isSender 
    ? 'bg-green-500 dark:bg-green-700 text-white' 
    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200';

  const CheckIcon: React.FC<{ stroke: string; }> = ({ stroke }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke={stroke}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  );
  
  const DoubleCheckIcon: React.FC<{ stroke: string; }> = ({ stroke }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke={stroke}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7m-7 10l4 4L22 14" /></svg>
  );

  const getStatusIcon = () => {
    if (!isSender) return null;
    switch (message.status) {
      case 'sent':
        return <CheckIcon stroke="#a7b0a9" />;
      case 'delivered':
        return <DoubleCheckIcon stroke="#a7b0a9" />;
      case 'read':
        return <DoubleCheckIcon stroke="#53bdeb" />; // A blue color for read status
      default:
        return null;
    }
  };

  return (
    <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${alignClass} ${colorClass}`}>
      {message.type === 'audio' && message.audioUrl ? (
        <audio controls src={message.audioUrl} className="w-full max-w-xs h-12"></audio>
      ) : (
        <p className="text-sm break-words">{message.text}</p>
      )}
      <div className="text-right text-xs mt-1 opacity-75">
        {message.timestamp}
        {getStatusIcon()}
      </div>
    </div>
  );
};

export default MessageBubble;
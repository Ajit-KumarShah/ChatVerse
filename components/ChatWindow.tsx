import React, { useEffect, useRef, useState } from 'react';
import { Chat, User, Message } from '../types';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { generateSmartReply } from '../services/geminiService';

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (chatId: string, messageData: { type: 'text'; text: string } | { type: 'audio'; audioUrl: string }) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, currentUser, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [message, setMessage] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = (messageData: { type: 'text'; text: string } | { type: 'audio'; audioUrl: string }) => {
    onSendMessage(chat.id, messageData);
  };
  
  const handleGenerateReply = async () => {
    setIsGeneratingReply(true);
    try {
      const reply = await generateSmartReply(chat.messages);
      setMessage(reply);
    } catch (error) {
      console.error("Failed to generate smart reply:", error);
      setMessage("Error generating reply.");
    } finally {
      setIsGeneratingReply(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-200 dark:bg-gray-900/50" style={{ backgroundImage: "url('https://i.pinimg.com/originals/85/ec/df/85ecdf1c361109f7955d93b450b549d0.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <ChatHeader user={chat.user} />
      
      <main className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
        {chat.messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} isSender={msg.senderId === currentUser.id} />
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        onGenerateReply={handleGenerateReply}
        isGenerating={isGeneratingReply}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default ChatWindow;
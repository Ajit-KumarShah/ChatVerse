export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Message {
  id:string;
  text?: string;
  audioUrl?: string;
  type: 'text' | 'audio';
  timestamp: string;
  senderId: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  user: User;
  messages: Message[];
  unreadCount: number;
}
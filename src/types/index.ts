
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: 'online' | 'offline';
  status: 'completed' | 'pending' | 'cancelled';
  consultant: string;
  notes?: string;
  meetingLink?: string;
  paymentStatus: 'paid' | 'pending' | 'cancelled';
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot' | 'admin';
  timestamp: Date;
}

export interface PaymentMethod {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
}

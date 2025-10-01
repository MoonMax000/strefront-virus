export interface MessageModel {
  id: string;
  userid?: number;
  username: string;
  message: string;
  role: 'user' | 'moderator' | 'admin';
  timestamp: number;
}

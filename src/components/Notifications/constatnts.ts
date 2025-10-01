import UserPhoto from '@/assets/def-logo.png';

export interface SubscriberItem {
  uid?: string;
  photo: string;
  type: string;
  name: string;
  date: string;
  text: string;
  textLink: string;
  id?: string;
  status?: 'read' | 'unread';
}

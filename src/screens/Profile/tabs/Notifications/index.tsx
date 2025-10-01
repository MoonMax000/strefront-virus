import Paper from '@/components/Paper';
import NotificationItem from './NotificationItem';

export interface ProfileNotificationModel {
  name: string;
  description: string;
  key: string;
}

const notifications: ProfileNotificationModel[] = [
  {
    name: 'Stream Going Live',
    description: 'When a followed channel starts a live stream',
    key: 'start_broadcast',
  },
  {
    name: 'Replay of Past Streams (VODs)',
    description: 'When a followed channel starts a replay',
    key: 'last_broadcasts',
  },
  {
    name: 'Mentions in Chat',
    description: 'When someone mentions you in the chat',
    key: 'references',
  },
  {
    name: 'New Follower',
    description: 'When another user follows you',
    key: 'new_subscriber',
  },
  {
    name: 'Recommednded Streams',
    description: 'When streams that match your interests go live',
    key: 'broadcast',
  },
  {
    name: 'Subscriptions',
    description: 'When there’s news about channels you’re subscribed to',
    key: 'subscriptions',
  },
];

const Notifications = () => {
  return (
    <>
      <p className='text-[19px] font-semibold max-tablet:hidden'>Notifications</p>

      <Paper className='mt-4 !p-0 max-tablet:!bg-transparent max-tablet:flex max-tablet:flex-col max-tablet:gap-8'>
        {notifications.map((notification) => (
          <NotificationItem key={notification.key} notification={notification} />
        ))}
      </Paper>
    </>
  );
};

export default Notifications;

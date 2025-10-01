import { FC, ReactNode, useState } from 'react';
import Button from '../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ISubscribeBody, RecomendationService } from '@/services/RecomendationService';
import clsx from 'clsx';

interface Props {
  id: string;
  type: 'subscribe' | 'unsubscribe';
  className?: string;
  children?: ReactNode;
}

const SubscribeButtom: FC<Props> = ({ id, type, className, children }) => {
  const [btnType, setBtnType] = useState<Props['type']>(type);

  const queryClient = useQueryClient();
  const {
    data: subscribeData,
    mutateAsync: mutateSubscribe,
    isPending: subscribePending,
  } = useMutation({
    mutationKey: ['subscribe'],
    mutationFn: (body: ISubscribeBody) => RecomendationService.subscribe(body),
  });

  const {
    data: unsubscribeData,
    mutateAsync: mutateUnsubscribe,
    isPending: unsubscribePending,
  } = useMutation({
    mutationKey: ['unSubscribe'],
    mutationFn: (body: ISubscribeBody) => RecomendationService.unsubscribe(body),
  });

  const handleSubscribe = async (id: string) => {
    await mutateSubscribe({ channel_id: id });
    console.log(subscribeData?.data.status);

    setBtnType('unsubscribe');

    await queryClient.invalidateQueries({ queryKey: ['getSubscribe'] });
    await queryClient.invalidateQueries({ queryKey: ['getSubscribers'] });
    await queryClient.invalidateQueries({ queryKey: ['getSubscriptionData'] });
  };

  const handleUnSubscribe = async (id: string) => {
    await mutateUnsubscribe({ channel_id: id });

    setBtnType('subscribe');
    await queryClient.invalidateQueries({ queryKey: ['getSubscribe'] });
    await queryClient.invalidateQueries({ queryKey: ['getSubscribers'] });
    await queryClient.invalidateQueries({ queryKey: ['getSubscriptionData'] });
  };

  return (
    <Button
      className={clsx('w-[180px] h-[44px]', className)}
      onClick={() => (btnType === 'subscribe' ? handleSubscribe(id) : handleUnSubscribe(id))}
      isLoading={btnType === 'subscribe' ? subscribePending : unsubscribePending}
      variant={btnType === 'subscribe' ? 'primary' : 'red'}
      aria-label={btnType === 'subscribe' ? 'Subscribe' : 'Unfollow'}
    >
      {children ? children : btnType === 'subscribe' ? 'Subscribe' : 'Unfollow'}
    </Button>
  );
};

export default SubscribeButtom;

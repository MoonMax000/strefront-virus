'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import IconDollar from '@/assets/icons/dollar.svg';
import IconUserPlus from '@/assets/icons/user-plus.svg';
import VideoPlayer from './VideoPlayer';
import Chat from './Chat';
import AcceptedIcon from '@/assets/icons/accepted.svg';
import ViewersIcon from '@/assets/icons/viewers.svg';
import { ProfileResponse } from '@/services/UserService';
import { IGetById, IGetSubscriptions, RecomendationService } from '@/services/RecomendationService';
import SubscribeButtom from '@/components/SubscribeButton';
import { useParams } from 'next/navigation';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { MessageModel } from './Chat/constants';
import { StreamService } from '@/services/StreamService';
import StopStreamIcon from '@/assets/icons/stop-stream-icon.svg';
import { IUser } from '@/services/AuthService';
import { getUserByStreamId } from '@/utils/hooks/useUserById';
import { getMediaUrl } from '@/utils/helpers/getMediaUrl';
import { chatService, HistoryMessage } from '@/services/ChatService';
import Link from 'next/link';

export type ModalKeys = 'blackList' | 'moderators';

export interface ChatState {
  isOpen: boolean;
  modalType: ModalKeys | null;
  isOpenChatModalsDropdown: boolean;
}

export const geChatId = (url: string): string => {
  const lastSlashIndex = url.lastIndexOf('/');

  if (lastSlashIndex === -1) {
    return '';
  } else {
    // console.log('urlssdsads', url.slice(lastSlashIndex + 1, url.length));
    return url.slice(lastSlashIndex + 1, url.length);
  }
};

const VideoScreen = () => {
  const [banList, setBanList] = useState<string[]>([]);
  const [moderatorlist, setModeratorList] = useState<string[]>([]);
  const isTablet = useMediaQuery('(max-width:824px)');
  const [chatState, setChatState] = useState<ChatState>({ isOpen: true } as ChatState);
  const [chatId, setChatId] = useState<string>('');
  const [translationUrl, setTranslationUrl] = useState('');
  const [idUnauthorized, setIdUnauthorized] = useState(false);
  const [chatData, setChatData] = useState<MessageModel[] | []>([]);

  const [userData, setUserData] = useState<IUser>();

  const { userId } = useParams();

  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<AxiosResponse<ProfileResponse>>(['getProfile']);

  const isOwn = useMemo(() => profileData?.data?.id === userId, [profileData, userId]);

  const { data: chatHistory } = useQuery({
    queryKey: ['chatHistory', chatId],
    enabled: !!chatId,
    refetchOnWindowFocus: false,
    queryFn: () => chatService.getChatHistory(chatId),
  });

  useEffect(() => {
    if (!chatId) return;
    const history = chatHistory?.data?.message;
    if (history) {
      setChatData(handleTransformData(history));
    } else {
      setChatData([]);
    }
  }, [chatId, chatHistory?.data?.message]);

  const handleTransformData = (data: HistoryMessage[]): MessageModel[] => {
    return (
      data
        ?.slice()
        .reverse()
        .map((message) => ({
          id: message.id,
          message: message.message,
          role: 'user',
          timestamp: new Date(message.timestamp_message).getTime(),
          username: message.nick,
        })) ?? []
    );
  };

  const { data: streamData } = useQuery<IGetById>({
    queryKey: ['getStreamData'],
    queryFn: async () => {
      const response = await RecomendationService.getChanelById((userId as string) || '');
      response.data.stream?.translation_url
        ? setTranslationUrl(response.data.stream?.translation_url)
        : setTranslationUrl('');
      if (response.data.stream?.translation_url) {
        const newchatId = geChatId(response.data.stream?.translation_url);
        if (newchatId && newchatId !== chatId) setChatId(newchatId);
      }
      return response;
    },
    refetchInterval: 2000,
    staleTime: 5000,
  });

  useEffect(() => {
    const loadUsers = async () => {
      if (!streamData?.data.id) return;

      const userData = await getUserByStreamId(streamData?.data.id);
      if (userData) setUserData(userData.user);
    };

    loadUsers();
  }, [streamData]);

  const { data: idData, refetch } = useQuery({
    queryKey: ['getSubscriptionData'],
    queryFn: async () => {
      try {
        const response = await RecomendationService.getSgetSubscriptionsID();
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 400) {
          setIdUnauthorized(true);
        }
        return [];
      }
    },
  });

  const toggleChatVisible = useCallback(() => {
    setChatState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  useEffect(() => {
    refetch();
  }, [userId]);

  const getButtonType = (id: string) => {
    const isSubscribed = (idData as IGetSubscriptions)?.data?.includes(id);
    return isSubscribed ? 'unsubscribe' : 'subscribe';
  };

  const chatActions = {
    closeChat: () => setChatState({} as ChatState),
    onOpenModal: (modalKey: ModalKeys) =>
      setChatState((prev) => ({ ...prev, modalType: modalKey })),
  };

  const { mutateAsync: mutateStopStream } = useMutation({
    mutationKey: ['getSubscribtionData'],
    mutationFn: () => StreamService.endStream(),
  });

  const stopStream = () => {
    setTranslationUrl('');
    mutateStopStream();
    chatActions.closeChat();
  };

  return (
    <>
      <section className='flex flex-row gap-4 max-tablet:-mx-4 max-tablet:gap-0 '>
        <div className='w-full'>
          <div className='flex flex-col gap-4'>
            <div className='w-full flex items-center gap-4'>
              <VideoPlayer
                key={translationUrl}
                url={translationUrl}
                poster={streamData?.data?.cover_url || '/streamBackground.jpg'}
                toggleChatVisible={toggleChatVisible}
                subscribersCount={streamData?.data.subscriber_count ?? 0}
              />
            </div>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex gap-3'>
                <div className='relative min-w-11 min-h-11 h-max border-[2px] rounded-full border-[#EF454A]'>
                  <img
                    src={userData?.avatar ? getMediaUrl(userData?.avatar) : '/streamerAvatar.jpg'}
                    alt='avatar'
                    className='size-[64px] rounded-[50%] max-tablet:size-12 object-cover'
                  />

                  <div className='absolute w-full max-w-[42px] left-[11px] -bottom-[9px] bg-[#FF5757] py-[2px] px-2 rounded max-tablet:hidden'>
                    <span className='text-xs font-bold text-white'>LIVE</span>
                  </div>
                </div>
                <div className='flex flex-col h-[72px] justify-between mt-[2px] mb-[6px]'>
                  <Link
                    target='_blank'
                    href={
                      process.env.NEXT_PUBLIC_PROFILE_URL ??
                      'https://profile.tyriantrade.com' + '/dashboard'
                    }
                  >
                    <p className='flex gap-1 items-center text-[15px] font-bold max-tablet:text-lg/6 max-tablet:font-bold'>
                      {userData?.username || 'Jane Doe'} <AcceptedIcon />
                    </p>
                    <p className='text-[15px] leading-5 font-bold'>
                      {streamData?.data?.stream?.stream_name ||
                        'Investing in a new Solana solutions for the market'}
                    </p>
                  </Link>

                  <div className='flex gap-4 items-center'>
                    <span className='mt-[3px] text-[15px] leading-5 text-purple font-bold'>
                      {streamData?.data.stream?.stream_category}
                    </span>
                    <div className='flex gap-1'>
                      {streamData?.data.stream?.stream_tags?.map((category, index) => (
                        <div
                          key={category + index}
                          className='rounded-[4px] py-[1px] font-bold text-white px-2 bg-[#523A83] text-[12px] uppercase'
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex items-start gap-4 h-[80px]'>
                {!isOwn ? (
                  <>
                    {streamData?.data?.donation_url && (
                      <Button
                        className='relative w-[240px] min-w-[240px] h-11 flex items-center justify-center gap-[10px] 
                        px-6 py-[15px] rounded-lg overflow-hidden
                        max-tablet:size-11 max-tablet:min-w-11 max-tablet:p-0'
                        variant='transparent'
                        onClick={() => window.open(streamData?.data?.donation_url, '_blank')}
                      >
                        <IconDollar className='text-[#A06AFF]' />
                        <span className='text-[#A06AFF] max-tablet:hidden'>
                          Support the Creator
                        </span>
                      </Button>
                    )}
                    {streamData?.data.id && (idUnauthorized || idData) && (
                      <div className='flex flex-col gap-2'>
                        <SubscribeButtom
                          key={streamData?.data?.id}
                          id={streamData?.data?.id ?? ''}
                          type={getButtonType(streamData?.data?.id ?? '')}
                          className='max-tablet:size-11 rounded-lg pt-[15px] pr-[24px] pb-[15px] pl-[24px] max-w-[117px] max-h-[44px] '
                        >
                          {isTablet && <IconUserPlus />}
                        </SubscribeButtom>
                        <div className='flex gap-1'>
                          <ViewersIcon />
                          <span className='text-[15px] font-bold'>
                            viewers -{' '}
                            <span className='text-[#A06AFF]'>
                              {streamData.data.stream?.viewer_count}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='flex flex-col gap-2 '>
                    <Button
                      className=' px-6 py-3 h-11 flex rounded-2'
                      variant='red'
                      onClick={stopStream}
                    >
                      <StopStreamIcon width={20} height={20} />
                      Stop Broadcast
                    </Button>
                    <div className='flex gap-1 justify-end'>
                      <ViewersIcon />
                      <span className='text-[15px] font-bold'>
                        viewers -{' '}
                        <span className='text-[#A06AFF]'>
                          {streamData?.data.stream?.viewer_count}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='mt-4 max-tablet:px-4 max-tablet:mb-3'>
            {isTablet && (
              <p className='text-[15px] leading-5 font-bold mt-[6px]'>
                Старт в трейдинге для новичков!
              </p>
            )}
          </div>
          {!isTablet ? (
            <Textarea
              label='Channel Info'
              labelClassName='!text-[19px] !leading-6 !mb-4'
              disabled
              placeholder={
                streamData?.data?.description ||
                'Subscriber count and a brief channel mission - filled in by the streamer in thr profile settings.'
              }
              className='!bg-[#0C101480] resize-none min-h-[140px] border-[1px] border-[#523A83]'
            />
          ) : (
            <div className='bg-darkCharcoal pb-5 -mb-4'>
              {chatId && chatHistory && (
                <Chat
                  {...chatActions}
                  moderatorlist={moderatorlist}
                  setModeratorList={setModeratorList}
                  chatId={chatId}
                  chatData={chatData}
                  setChatData={setChatData}
                  banList={banList}
                  setBanList={setBanList}
                  chatState={chatState}
                  setChatState={setChatState}
                />
              )}
            </div>
          )}
        </div>

        {!isTablet && chatId && chatHistory && (
          <AnimatePresence>
            {chatState.isOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 392, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                <Chat
                  {...chatActions}
                  moderatorlist={moderatorlist}
                  setModeratorList={setModeratorList}
                  chatId={chatId}
                  chatData={chatData}
                  setChatData={setChatData}
                  banList={banList}
                  setBanList={setBanList}
                  chatState={chatState}
                  setChatState={setChatState}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>
    </>
  );
};

export default VideoScreen;

'use client';
import IconSafety from '@/assets/icons/chat/safety.svg';
import IconLogout from '@/assets/icons/chat/logout.svg';
import IconUserBlackList from '@/assets/icons/chat/user-blacklist.svg';
import { MessageModel } from './constants';
import MessageItem from './MessageItem';
import IconSettings from '@/assets/icons/video/settings.svg';
import SendIcon from '@/assets/icons/chat/paper-plan.svg';

import {
  Dispatch,
  FC,
  KeyboardEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Tooltip } from 'react-tooltip';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { ChatState, ModalKeys } from '..';
import Cookies from 'js-cookie';
import { AnimatePresence, motion } from 'framer-motion';
import TextInput from '@/components/ui/TextInput';
import BlackListModal from './BlackListModal';
import ModeratorsModal from './ModeratorsModal';
import ModalWrapper from '@/components/Modals/ModalWrapper';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ProfileResponse } from '@/services/UserService';

interface ChatProps {
  banList: string[];
  moderatorlist: string[];
  setBanList: Dispatch<SetStateAction<string[]>>;
  setModeratorList: Dispatch<SetStateAction<string[]>>;
  chatData: MessageModel[] | [];
  setChatData: Dispatch<SetStateAction<MessageModel[] | []>>;
  onOpenModal: (key: ModalKeys) => void;
  closeChat: () => void;
  chatId: string;
  chatState: ChatState;
  setChatState: Dispatch<SetStateAction<ChatState>>;
}

interface IMSG {
  type: 'MSG';
  data: {
    id: string;
    data: string;
    features?: MessageModel['role'][];
    nick: string;
    timestamp: number;
  };
}

type DMSG =
  | { type: 'DELETEMSG'; id_mgs?: string; delete_mgs?: string; data?: { id?: string } }
  | { type: string; [k: string]: any };

const Chat: FC<ChatProps> = ({
  closeChat,
  onOpenModal,
  chatId,
  chatData,
  setChatData,
  setBanList,
  banList,
  moderatorlist,
  setModeratorList,
  chatState,
  setChatState,
}) => {
  const isTablet = useMediaQuery('(max-width:824px)');
  const [message, setMessage] = useState<string>();
  const [openedMessageId, setOpenedMessageId] = useState<string | null>(null);
  const [admin, setAdmin] = useState<string>('');
  const [myRoles, setMyRoles] = useState<MessageModel['role'][]>([]);

  const [events, setEvents] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<AxiosResponse<ProfileResponse>>(['getProfile']);

  const addEvent = (text: string) => {
    setEvents((prev) => [...prev, text]);
  };

  const handleSerchKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      const token = Cookies.get('sessionid') || '';
      const protocols = ['chat', chatId, token];
      const ws = new WebSocket(`wss://chat-ws.k8s.tyriantrade.com/ws`, protocols);

      ws.onopen = () => {
        setIsConnected(true);
        addEvent('🚀 Connected to WebSocket!');
      };

      ws.onmessage = (event) => {
        const serverMessage = JSON.parse(event.data);

        const toRole = (features?: MessageModel['role'][]): MessageModel['role'] =>
          (features && features[0]) || 'user';

        switch (serverMessage.type) {
          case 'MSG': {
            const msgData = serverMessage as IMSG;
            setChatData((prev) => [
              ...prev,
              {
                id: msgData.data.id,
                username: msgData.data.nick,
                message: msgData.data.data,
                role: toRole(msgData.data.features),
                timestamp: msgData.data.timestamp,
              },
            ]);
            break;
          }

          case 'NAMES': {
            const users = (serverMessage.data?.users || []) as {
              nick: string;
              features: MessageModel['role'][];
            }[];

            users.map((item) => {
              item.features.map((feature) => {
                if (feature === 'admin') setAdmin(item.nick);
              });
              if (item.nick === profileData?.data.username) setMyRoles(item.features);
            });

            console.log('users 2', users);

            break;
          }

          case 'JOIN': {
            const join = serverMessage.data as { nick: string; features: MessageModel['role'][] };
            if (join?.nick) {
              const role = toRole(join.features);
              setChatData((prev) =>
                prev.map((m) => (m.username === join.nick ? { ...m, role } : m)),
              );
            }
            break;
          }

          case 'BANLIST': {
            if (serverMessage.data.banlist) setBanList(serverMessage.data.banlist);
            else setBanList([]);
            break;
          }

          case 'MODERATORLIST': {
            const list: string[] = serverMessage.data?.moderatorlist || [];
            setModeratorList(list);
            setChatData((prev) =>
              prev.map((m) =>
                list.includes(m.username) && m.role !== 'admin' ? { ...m, role: 'moderator' } : m,
              ),
            );
            break;
          }

          case 'DELETEMSG': {
            let delId: string | undefined;

            try {
              const parsed = serverMessage.data?.data ? JSON.parse(serverMessage.data.data) : null;
              delId = parsed?.data?.id;
            } catch {
              delId = undefined;
            }

            if (delId) {
              setChatData((prev) => prev.filter((m) => m.id !== delId));
            }
            break;
          }
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        addEvent('Connection closed');
      };

      ws.onerror = (error) => {
        addEvent(`Error: ${JSON.stringify(error)}`);
      };

      wsRef.current = ws;
    };
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (wsRef.current && isConnected) {
      try {
        const data = {
          data: message,
          extradata: '',
          duration: 100,
        };

        const messageData = `MSG ${JSON.stringify(data)}`;
        wsRef.current.send(messageData);
        setMessage('');
        addEvent(`Sent: ${messageData}`);
      } catch (error) {
        addEvent('Error sending message');
      }
    } else {
      addEvent('WebSocket is not connected');
    }
  };

  const deleteMessage = (message: MessageModel) => {
    if (!wsRef.current || !isConnected) return;
    const payload = {
      id_mgs: message.id,
      delete_mgs: JSON.stringify({
        type: 'MSG',
        data: {
          id: message.id,
          nick: message.username,
          features: [message.role],
          timestamp: message.timestamp,
          data: message.message,
        },
      }),
    };
    const msg = `DELETEMSG ${JSON.stringify(payload)}`;
    wsRef.current.send(msg);
    addEvent(`Sent: ${msg}`);
  };

  const banUser = (message: MessageModel) => {
    if (wsRef.current && isConnected) {
      try {
        const messageData = `${'BAN'} {"nick": "${message.username}", "banip": false, "duration": 100, "ispermanent": true, "reason": "Spammer"}`;
        wsRef.current.send(messageData);
        setTimeout(() => {
          getBanList();
        }, 2000);

        addEvent(`Sent: ${messageData}`);
      } catch (error) {
        addEvent('Error sending message');
      }
    } else {
      addEvent('WebSocket is not connected');
    }
  };

  const unBanUser = (userName: string) => {
    if (wsRef.current && isConnected) {
      try {
        const messageData = `${'UNBAN'} {"data": "${userName}", "extradata": "", "duration": 100}`;
        wsRef.current.send(messageData);
        setTimeout(() => {
          getBanList();
        }, 2000);

        addEvent(`Sent: ${messageData}`);
      } catch (error) {
        addEvent('Error sending message');
      }
    } else {
      addEvent('WebSocket is not connected');
    }
  };

  const getModeratorList = () => {
    if (wsRef.current && isConnected) {
      try {
        const messageData = `${'MODERATORLIST request'}`;
        wsRef?.current.send(messageData);
        addEvent(`Sent: ${messageData}`);
      } catch (error) {
        addEvent('Error sending message');
      }
    } else {
      addEvent('WebSocket is not connected');
    }
  };

  const getBanList = () => {
    if (wsRef.current && isConnected) {
      try {
        const messageData = `${'BANLIST request'}`;
        wsRef?.current.send(messageData);
        addEvent(`Sent: ${messageData}`);
      } catch (error) {
        addEvent('Error sending message');
      }
    } else {
      addEvent('WebSocket is not connected');
    }
  };

  const makeModerator = (message: MessageModel) => {
    if (wsRef.current && isConnected) {
      try {
        const messageData = `${'ROLE'} {"nick": "${message.username}", "role": "moderator"}`;
        wsRef.current.send(messageData);
        addEvent(`Sent: ${messageData}`);
        setTimeout(() => {
          getModeratorList();
        }, 2000);
      } catch (error) {
        addEvent('Error sending message');
      }
    } else {
      addEvent('WebSocket is not connected');
    }
  };

  const delModerator = (userName: string) => {
    if (wsRef.current && isConnected) {
      try {
        const messageData = `${'UNROLE'} {"nick": "${userName}", "role": "moderator"}`;
        wsRef.current.send(messageData);
        addEvent(`Sent: ${messageData}`);
        setTimeout(() => {
          getModeratorList();
        }, 2000);
      } catch (error) {
        addEvent('Error sending message');
      }
    } else {
      addEvent('WebSocket is not connected');
    }
  };
  useEffect(() => {
    if (wsRef.current && isConnected) {
      getBanList();
      getModeratorList();
    }
  }, [isConnected]);

  const modals = useMemo((): Record<
    ModalKeys,
    {
      title: string;
      component: ReactNode;
    }
  > => {
    return {
      blackList: {
        title: 'Черный список',
        component: (
          <BlackListModal
            banList={banList}
            unBanUser={unBanUser}
            closeModal={() => setChatState((prev) => ({ ...prev, modalType: null }))}
          />
        ),
      },
      moderators: {
        title: 'Модераторы',
        component: (
          <ModeratorsModal
            delModerator={delModerator}
            moderatorlist={moderatorlist}
            closeModal={() => setChatState((prev) => ({ ...prev, modalType: null }))}
          />
        ),
      },
    };
  }, [banList, moderatorlist]);

  return (
    <>
      <div className='relative rounded-xl #181A20 bg-[#181A20] pt-4 pb-20 h-[720px] max-h-[720px] max-w-[342px]  max-tablet:h-auto  max-tablet:max-w-none max-tablet:rounded-none max-tablet:bg-transparent'>
        {!isTablet && (
          <div className='flex items-center gap-2 justify-between mb-2 px-4'>
            {!!myRoles.length && (
              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  data-tooltip-id='tooltip'
                  data-tooltip-content='Moderators'
                  onClick={() => onOpenModal('moderators')}
                >
                  <IconSafety className='hover:text-purple' />
                </button>
                <button
                  type='button'
                  data-tooltip-id='tooltip'
                  data-tooltip-content='BlackList'
                  onClick={() => onOpenModal('blackList')}
                >
                  <IconUserBlackList className='hover:text-purple' />
                  <Tooltip
                    id='tooltip'
                    className='!rounded-[4px] !bg-[#2F3136] !py-[2px] !px-[10px] !text-base leading-[22px] font-semibold'
                    noArrow
                  />
                </button>
              </div>
            )}
            <p className='text-gray font-semibold text-base leading-[22px]'>Чат трансляции</p>
            <button type='button' onClick={closeChat}>
              <IconLogout />
            </button>
          </div>
        )}

        <div className='max-h-[95%]  h-[95%] overflow-auto scrollbar-small flex  flex-col gap-[14px] max-tablet:max-h-[360px]'>
          {chatData.map((message) => (
            <MessageItem
              isAdmin={admin === message.username}
              isOwn={profileData?.data.username === message.username}
              myRoles={myRoles}
              unBanUser={unBanUser}
              delModerator={delModerator}
              banList={banList}
              moderatorlist={moderatorlist}
              makeModerator={makeModerator}
              banUser={banUser}
              deleteMessage={deleteMessage}
              key={message.id}
              message={message}
              openMessageId={openedMessageId}
              onActionOpen={(messageId) => setOpenedMessageId(messageId)}
            />
          ))}
        </div>
        {!isTablet ? (
          <div className='px-4 absolute w-full bottom-4 z-10'>
            <TextInput
              value={message}
              onKeyDown={handleSerchKeyDown}
              onChange={(value) => setMessage(value)}
              placeholder='Отправить сообщение...'
              classes={{
                inputWrapper: 'bg-[#FFFFFF1A] max-tablet:pr-0 max-tablet:pl-3',
                inputRaf: '!bg-transparent pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
                label: {
                  classes: 'opacity-[1] text-[15px]',
                  bold: 'font-medium',
                },
              }}
              icon={
                <div className='pr-3'>
                  <SendIcon className='text-purple' width={21} height={20} onClick={sendMessage} />
                </div>
              }
            />
          </div>
        ) : (
          <div className='flex items-center gap-3 px-4 mt-1 absolute w-full bottom-4 z-10'>
            <TextInput
              value={message}
              onKeyDown={handleSerchKeyDown}
              onChange={(value) => setMessage(value)}
              placeholder='Отправить сообщение...'
              classes={{
                inputWrapper: 'bg-[#FFFFFF1A] pr-3 max-tablet:pr-0 max-tablet:pl-3',
                inputRaf: '!bg-transparent pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
                label: {
                  classes: 'opacity-[1] text-[15px]',
                  bold: 'font-medium',
                },
              }}
              icon={
                <div className='pr-3'>
                  <SendIcon className='text-purple' width={21} height={20} onClick={sendMessage} />
                </div>
              }
            />

            <button
              type='button'
              onClick={() => {
                setChatState((prev) => ({
                  ...prev,
                  isOpenChatModalsDropdown: !prev.isOpenChatModalsDropdown,
                }));
              }}
            >
              <IconSettings />
            </button>

            <AnimatePresence>
              {chatState.isOpenChatModalsDropdown && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='absolute -top-[calc(100%+50px)] right-4 w-[232px] bg-[#23252D] z-50 rounded-xl'
                >
                  <li
                    role='button'
                    className='px-4 py-[10px] flex items-center gap-[10px] border-b border-[#ffffff29]'
                    onClick={() => {
                      setChatState((prev) => ({
                        ...prev,
                        modalType: 'blackList',
                        isOpenChatModalsDropdown: false,
                      }));
                    }}
                  >
                    <IconUserBlackList className='text-purple' />
                    <p className='text-[15px] leading-5 font-semibold'>Черный список</p>
                  </li>
                  <li
                    role='button'
                    className='px-4 py-[10px] flex items-center gap-[10px]'
                    onClick={() => {
                      setChatState((prev) => ({
                        ...prev,
                        modalType: 'moderators',
                        isOpenChatModalsDropdown: false,
                      }));
                    }}
                  >
                    <IconSafety className='text-purple' />
                    <p className='text-[15px] leading-5 font-semibold'>Модераторы</p>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <ModalWrapper
        isOpen={!!chatState.modalType}
        onClose={() => setChatState((prev) => ({ ...prev, modalType: null }))}
        title={chatState.modalType ? modals[chatState.modalType].title : undefined}
      >
        {chatState.modalType && modals[chatState.modalType].component}
      </ModalWrapper>
    </>
  );
};

export default Chat;

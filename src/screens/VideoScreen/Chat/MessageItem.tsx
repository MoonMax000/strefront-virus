import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { MessageModel } from './constants';
import { AnimatePresence, motion } from 'framer-motion';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import IconSafety from '@/assets/icons/chat/safety.svg';
import IconUserBlackList from '@/assets/icons/chat/user-blacklist.svg';
import IconMute from '@/assets/icons/video/sound-off.svg';
import IconRemoveMessage from '@/assets/icons/chat/message-minus.svg';
import { AuthService, IUser } from '@/services/AuthService';

interface MessageItemProps {
  isAdmin: boolean;
  message: MessageModel;
  openMessageId: null | string;
  banUser: (message: MessageModel) => void;
  makeModerator: (message: MessageModel) => void;
  onActionOpen: (messageId: null | string) => void;
  deleteMessage: (message: MessageModel) => void;
  unBanUser: (userName: string) => void;
  delModerator: (userName: string) => void;
  moderatorlist: string[];
  banList: string[];
  myRoles: MessageModel['role'][];
  isOwn: boolean;
}

const MessageItem: FC<MessageItemProps> = ({
  message,
  onActionOpen,
  openMessageId,
  deleteMessage,
  makeModerator,
  banUser,
  banList,
  unBanUser,
  moderatorlist,
  delModerator,
  myRoles,
  isOwn,
  isAdmin,
}) => {
  const isTablet = useMediaQuery('(max-width:824px)');
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [isModerator, setIsModerator] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();
  const [displayName, setDisplayName] = useState<string>(message.username);
  console.log('message1', message);

  useEffect(() => {
    let cancelled = false;
    const loadUsers = async () => {
      try {
        if (!message.username) return;

        // по умолчанию показываем то, что пришло в сообщении
        setDisplayName(message.username);

        // если это e-mail — пробуем подтянуть красивый ник; любые ошибки игнорим
        if (message.username.includes('@')) {
          const data = await AuthService.getUserByEmail(message.username);
          if (!cancelled && data) {
            setUserData(data);
            if (data.username) setDisplayName(data.username);
          }
        }
      } catch {
        // 404 и пр. — просто оставляем displayName = message.username
        if (!cancelled) setDisplayName(message.username);
      }
    };

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, [message.username]);

  useEffect(() => {
    setIsBanned(!(banList?.findIndex((user) => user === message.username) === -1));
  }, [banList]);

  useEffect(() => {
    setIsModerator(!(moderatorlist?.findIndex((user) => user === message.username) === -1));
  }, [moderatorlist]);

  const messageActions = useMemo(() => {
    return [
      {
        name: 'Удалить сообщение',
        key: 'removeMessage',
        icon: <IconRemoveMessage />,
        onclick: () => {
          onActionOpen(null);
          deleteMessage(message);
        },
      },
      // {
      //   name: 'Замьютить',
      //   key: 'mute',
      //   icon: <IconMute />,
      //   onclick: () => {
      //     onActionOpen(null);
      //   },
      // },
      ...(!isAdmin && !isOwn
        ? [
            {
              name: isBanned ? 'Разблокировать' : 'Заблокировать',
              key: 'block',
              icon: <IconUserBlackList />,
              onclick: () => {
                onActionOpen(null);
                isBanned ? unBanUser(message.username) : banUser(message);
              },
            },
          ]
        : []),
      ...(!isAdmin && !isOwn
        ? [
            {
              name: isModerator ? 'Забрать модератора' : 'Сделать модератором',
              key: 'safety',
              icon: <IconSafety />,
              onclick: () => {
                onActionOpen(null);
                isModerator ? delModerator(message.username) : makeModerator(message);
              },
            },
          ]
        : []),
    ];
  }, [isBanned, isModerator, isAdmin, message.username]);

  return (
    <div
      className='px-4 relative transition-colors hover:bg-[#523A83] py-[7px] group'
      role={isTablet ? 'button' : 'note'}
      onClick={
        !isTablet ? undefined : () => onActionOpen(openMessageId === message.id ? null : message.id)
      }
    >
      <span
        className={clsx('text-sm font-semibold', {
          'text-[#CF25CC]': isModerator,
          'text-[#f0a41f]': isAdmin,
          'text-[#FFFFFF80]': !isModerator && !isAdmin,
        })}
      >
        {displayName}: &nbsp;
      </span>
      <span>{message.message}</span>

      {!isTablet && myRoles.length && (
        <div className='bg-[#523A83] absolute right-2 top-1 flex justify-end w-[50px] h-8 opacity-0 transition-opacity group-hover:opacity-100'>
          <button
            type='button'
            className='size-6 flex items-center justify-center gap-[1px]'
            onClick={() => onActionOpen(openMessageId === message.id ? null : message.id)}
          >
            <span className='size-[6px] rounded-[50%] bg-white' />
            <span className='size-[6px] rounded-[50%] bg-white' />
            <span className='size-[6px] rounded-[50%] bg-white' />
          </button>
        </div>
      )}

      <AnimatePresence>
        {openMessageId === message.id && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='z-50 min-w-[232px] absolute right-4 top-[calc(100%+21px)] bg-[#2F3136] rounded-xl overflow-hidden max-tablet:right-auto max-tablet:left-[64px] max-tablet:top-[75%]'
          >
            {messageActions.map((action) => (
              <li
                key={action.key}
                role='button'
                className='[&>svg]:text-purple py-[10px] px-4 flex items-center gap-[10px] border-b last:border-none border-[#ffffff29]'
                onClick={action.onclick}
              >
                {action.icon}
                <span className='text-sm font-semibold'>{action.name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageItem;

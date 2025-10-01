import Button from '@/components/ui/Button';
import IconTimes from '@/assets/icons/times-in-circle.svg';
import IconSearch from '@/assets/icons/search/icon-serach.svg';
import TextInput from '@/components/ui/TextInput';
import { FC, useEffect, useState } from 'react';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { AuthService } from '@/services/AuthService';

interface IUser {
  email: string;
  username: string;
}

const ModeratorsModal: FC<{
  closeModal: () => void;
  moderatorlist: string[]; // список email-ов
  delModerator: (email: string) => void;
}> = ({ closeModal, moderatorlist, delModerator }) => {
  const isTablet = useMediaQuery('(max-width:824px)');
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  // Загружаем usernames по email-ам
  useEffect(() => {
    const loadUsers = async () => {
      if (!moderatorlist?.length) {
        setUsers([]);
        return;
      }

      try {
        const results = await Promise.all(
          moderatorlist.map(async (email) => {
            try {
              const userData = await AuthService.getUserByEmail(email);
              return {
                email,
                username: userData?.username || email,
              };
            } catch (err) {
              console.warn('Ошибка при получении юзера:', err);
              return { email, username: email }; // fallback — показываем email
            }
          }),
        );

        setUsers(results);
        setFilteredUsers(results);
      } catch (err) {
        console.warn('Ошибка при загрузке модераторов:', err);
      }
    };

    loadUsers();
  }, [moderatorlist]);

  // Фильтрация по поиску
  useEffect(() => {
    if (!search) {
      setFilteredUsers(users);
      return;
    }

    const searchTerm = search.toLowerCase();
    const filtered = users.filter((u) => u.username.toLowerCase().includes(searchTerm));
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div className='relative'>
      <p className='opacity-[48%] text-sm font-medium'>
        Управляйте своими модераторами! Выберите новых участников для поддержки вашего стрима или
        удалите существующих. Не забудьте сохранить свои изменения
      </p>

      <TextInput
        value={search}
        onChange={(value) => setSearch(value)}
        label='Поиск по никнейму'
        placeholder='Поиск'
        classes={{
          root: 'mt-6',
          inputWrapper: 'bg-moonlessNight pr-3 max-tablet:pr-0 max-tablet:pl-3',
          inputRaf: '!bg-transparent pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
          label: {
            classes: 'opacity-[1] text-[15px]',
            bold: 'font-medium',
          },
        }}
        icon={<IconSearch />}
        iconPosition={isTablet ? 'left' : 'right'}
      />

      <p className='text-[15px] leading-5 mb-2 mt-6'>Действующие модераторы</p>

      <div className='flex items-center gap-2 flex-wrap max-tablet:flex-col'>
        {filteredUsers.map((user) => (
          <div
            key={user.email}
            className='bg-[#2A2C32] rounded-lg py-[6px] pr-2 pl-3 flex items-center gap-[6px] max-tablet:p-3 max-tablet:pr-2 max-tablet:justify-between max-tablet:w-full'
          >
            <span className='text-[16px] leading-[22px] font-semibold'>{user.username}</span>
            <button
              type='button'
              onClick={() => delModerator(user.email)} // <-- отдаем email
              className='text-[#FF5757] max-tablet:text-white max-tablet:opacity-[48%]'
            >
              <IconTimes />
            </button>
          </div>
        ))}
      </div>

      <div className='sticky bottom-0 w-full left-0 z-50'>
        <Button className='w-[180px] h-11 px-4 py-[10px] mx-auto mt-10' onClick={closeModal}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ModeratorsModal;

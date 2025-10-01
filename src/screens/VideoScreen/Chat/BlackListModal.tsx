import { FC, useEffect, useState } from 'react';
import IconTimes from '@/assets/icons/times-in-circle.svg';
import IconSearch from '@/assets/icons/search/icon-serach.svg';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { AuthService } from '@/services/AuthService';

interface IUser {
  email: string;
  username: string;
}

const BlackListModal: FC<{
  closeModal: () => void;
  banList: string[];
  unBanUser: (email: string) => void;
}> = ({ closeModal, banList, unBanUser }) => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!banList?.length) {
        setUsers([]);
        return;
      }

      try {
        const results = await Promise.all(
          banList.map(async (email) => {
            try {
              const userData = await AuthService.getUserByEmail(email);
              return {
                email,
                username: userData?.username || email,
              };
            } catch (err) {
              console.warn('Ошибка при получении юзера', err);
              return { email, username: email };
            }
          }),
        );

        setUsers(results);
        setFilteredUsers(results);
      } catch (err) {
        console.warn('Ошибка при загрузке пользователей:', err);
      }
    };

    loadUsers();
  }, [banList]);

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
        Управляйте черным списком пользователей, которые не должны иметь доступ к вашему чату.
      </p>

      <TextInput
        value={search}
        onChange={(value) => setSearch(value)}
        label='Поиск по никнейму'
        placeholder='Поиск'
        classes={{
          root: 'mt-6',
          inputWrapper: 'bg-moonlessNight pr-3',
          inputRaf: '!bg-transparent pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
          label: {
            classes: 'opacity-[1] text-[15px]',
            bold: 'font-medium',
          },
        }}
        icon={<IconSearch />}
        iconPosition='right'
      />

      <p className='text-[15px] leading-5 mb-2 mt-6'>Ограниченные пользователи</p>
      <div className='flex flex-col gap-2'>
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className='pl-3 pr-2 py-[10px] flex items-center justify-between gap-2 bg-[#2A2C32] rounded-lg'
          >
            <span className='text-base leading-[22px] font-semibold'>{user.username}</span>
            <button type='button' onClick={() => unBanUser(user.email)} className='text-[#FF5757]'>
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

export default BlackListModal;

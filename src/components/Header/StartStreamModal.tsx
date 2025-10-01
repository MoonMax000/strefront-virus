'use client';

import IconSearch from '@/assets/icons/search/icon-serach.svg';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import { FC, FormEvent, useEffect, useState } from 'react';
import TextInput from '../ui/TextInput';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IStartStream, StreamService } from '@/services/StreamService';
import { ProfileResponse } from '@/services/UserService';
import { AxiosResponse } from 'axios';
import Select from '../ui/Select';
import { ICategory, RecomendationService } from '@/services/RecomendationService';

interface IStartStreamFormState {
  name: string;
  notification: string;
  category?: string;
  tags: string[];
}

const StartStreamModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const router = useRouter();
  const [formState, setFormState] = useState<IStartStreamFormState>({
    name: '',
    notification: '',
    category: '',
    tags: [],
  });
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<AxiosResponse<ProfileResponse>>(['getProfile']);

  const { data, mutateAsync } = useMutation({
    mutationKey: ['startStream'],
    mutationFn: (body: IStartStream) => StreamService.startStream(body),
  });
  const { mutateAsync: stopStream } = useMutation({
    mutationKey: ['getSubscribtionData'],
    mutationFn: () => StreamService.endStream(),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => RecomendationService.getCategories(),
  });

  const handleTagsChange = (text: string) => {
    const parts = text.split(' ');
    const tags = parts.slice(0, -1).filter((tag) => tag.trim() !== '');
    const draft = parts[parts.length - 1];

    setFormState((prev) => ({
      ...prev,
      tags: [...tags, draft],
    }));
  };


  useEffect(() => {
    stopStream();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startStreamBody: IStartStream = {
      translation_category: formState.category || '',
      translation_name: formState.name,
      translation_notify_message: formState.notification,
      translation_tags: formState.tags,
    };
    mutateAsync(startStreamBody);
  };

  useEffect(() => {
    if (!data?.data) return;
    router.push(`/video/${profileData?.data.id}`);
    closeModal();
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4'>
        <div>
          <Textarea
            value={formState.name}
            label='Title'
            placeholder='Enter a name for your broadcast'
            onChange={(event) => {
              if (event.target.value.length < 140) {
                setFormState((prev) => ({ ...prev, name: event.target.value }));
              }
            }}
          />
          <span className='text-[14px] leading-5 font-semibold opacity-40 float-right'>
            {formState.name.length}/140
          </span>
        </div>

        <div>
          <Textarea
            value={formState.notification}
            label='Notification'
            placeholder='Enter the notification text that your followers will recieve'
            onChange={(event) => {
              if (event.target.value.length < 140) {
                setFormState((prev) => ({ ...prev, notification: event.target.value }));
              }
            }}
          />
          <span className='text-[14px] leading-5 font-semibold opacity-40 float-right'>
            {formState.notification.length}/140
          </span>
        </div>

        <Select
          label='Category'
          placeholder='Select category'
          options={(categoriesData || []).map((cat: ICategory) => ({
            label: cat.name,
            value: cat.name,
          }))}
          value={formState.category}
          onChange={(val) => setFormState((prev) => ({ ...prev, category: val }))}
        />

        <div>
          <TextInput
            label='Tags'
            placeholder='Use space to separate tags'
            classes={{
              input: 'p-3 !bg-transparent',
              label: {
                classes: '!text-[15px] !leading-5 !font-bold !text-white !opacity-100',
              },
            }}
            onChange={handleTagsChange}
            value={formState.tags.join(' ')}
            icon={<IconSearch className='ml-2 mr-3 min-w-6 min-h-6' />}
            iconPosition='left'
          />
          <p className='text-sm font-semibold opacity-40 mt-2'>
            Add up to 10 tags. Each tag can be up to 25 characters long and must not contain spaces
            or special characters
          </p>
        </div>
      </div>

      <Button
        type='submit'
        className='flex items-center mt-10 w-[240px] h-11 py-[15px] px-6 mx-auto'
      >
        <span>Start Broadcast</span>
      </Button>
    </form>
  );
};

export default StartStreamModal;

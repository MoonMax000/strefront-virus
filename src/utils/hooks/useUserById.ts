import { UserService } from '@/services/UserService';
import { AuthService } from '@/services/AuthService';

export async function getUserByStreamId(streamId: string) {
  try {
    const emailResponse = await UserService.getEmail(streamId);
    const email = emailResponse?.data?.message;

    if (!email) {
      throw new Error('Email not found');
    }

    const user = await AuthService.getUserByEmail(email);

    return {
      email,
      user,
    };
  } catch (error) {
    console.warn('Ошибка при получении пользователя по streamId:', error);
    throw error;
  }
}

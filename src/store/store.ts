import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notificationWebSocketReduxer from './NotificationSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    notification: notificationWebSocketReduxer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

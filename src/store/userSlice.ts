import { MessageModel } from '@/screens/VideoScreen/Chat/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
}

interface UserState {
  users: User[];
  moderators: string[];
  blacklist: string[];
  messages: MessageModel[];
}

const initialState: UserState = {
  users: [
    { id: 1, username: 'moderator_1', email: 'alice@example.com', role: 'moderator' },
    { id: 2, username: 'moderator_2', email: 'bob@example.com', role: 'moderator' },
    { id: 3, username: 'spamer_1', email: 'charlie@example.com', role: 'user' },
    { id: 4, username: 'spamer_2', email: 'dave@example.com', role: 'user' },
  ],
  moderators: ['moderator_1', 'moderator_2'],
  blacklist: ['spamer_1', 'spamer_2'],
  messages: [
    {
      id: '1',
      userid: 1,
      username: 'moderator_1',
      message: 'Hello everyone! How are you doing?',
      role: 'user',
      timestamp: Date.now() - 3600000, // 1 hour ago
    },
    {
      id: '2',
      userid: 1,
      username: 'moderator_1',
      message: 'Good afternoon everyone!',
      role: 'user',
      timestamp: Date.now() - 1800000, // 30 minutes ago
    },
    {
      id: '3',
      userid: 2,
      username: 'moderator_2',
      message: 'Just a reminder of our community guidelines',
      role: 'moderator',
      timestamp: Date.now() - 900000, // 15 minutes ago
    },
    {
      id: '4',
      userid: 2,
      username: 'moderator_2',
      message: 'System maintenance scheduled for tomorrow at 3:00 AM',
      role: 'admin',
      timestamp: Date.now() - 300000, // 5 minutes ago
    },
    {
      id: '5',
      userid: 3,
      username: 'spamer_1',
      message: 'Thanks for the update!',
      role: 'user',
      timestamp: Date.now() - 120000, // 2 minutes ago
    },
    {
      id: '6',
      userid: 3,
      username: 'spamer_1',
      message: 'Let us know if you have any questions!',
      role: 'moderator',
      timestamp: Date.now() - 60000, // 1 minute ago
    },
    {
      id: '7',
      userid: 4,
      username: 'spamer_2',
      message: 'All systems operational',
      role: 'admin',
      timestamp: Date.now(), // current time
    },
    {
      id: '8',
      userid: 4,
      username: 'spamer_2',
      message: 'All systems operational',
      role: 'admin',
      timestamp: Date.now(), // current time
    },
    {
      id: '9',
      userid: 4,
      username: 'spamer_2',
      message: 'All systems operational',
      role: 'admin',
      timestamp: Date.now(), // current time
    },
    {
      id: '10',
      userid: 4,
      username: 'spamer_2',
      message: 'All systems operational',
      role: 'admin',
      timestamp: Date.now(), // current time
    },
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addModerator: (state, action: PayloadAction<string>) => {
      const username = action.payload;
      const user = state.users.find((u) => u.username === username);

      if (!user) {
        console.log('User not found');
      }
      if (state.moderators.includes(username)) {
        console.log('User is already a moderator');
      }
      if (state.blacklist.includes(username)) {
        console.log('User is in blacklist and cannot be a moderator');
      }
      if (user?.role !== 'admin' && user?.role !== 'moderator') {
        console.log('User must have admin or moderator role to be added as a moderator');
      }
      state.moderators.push(username);
    },
    removeModerator: (state, action: PayloadAction<string>) => {
      console.log('aaaaaaa');
      const username = action.payload;
      state.moderators = state.moderators.filter((name) => name !== username);
    },
    addToBlacklist: (state, action: PayloadAction<string>) => {
      const username = action.payload;
      const user = state.users.find((u) => u.username === username);

      if (!user) {
        console.log('User not found');
      }
      if (state.blacklist.includes(username)) {
        console.log('User is already in blacklist');
      }
      state.blacklist.push(username);
      state.moderators = state.moderators.filter((name) => name !== username);
    },
    removeFromBlacklist: (state, action: PayloadAction<string>) => {
      const username = action.payload;
      state.blacklist = state.blacklist.filter((name) => name !== username);
    },
    setModeratorList: (state, action: PayloadAction<string[]>) => {
      const invalidUsers = action.payload.filter(
        (username) => !state.users.some((u) => u.username === username),
      );

      if (invalidUsers.length > 0) {
        throw new Error(`Users not found: ${invalidUsers.join(', ')}`);
      }

      const bannedUsers = action.payload.filter((username) => state.blacklist.includes(username));

      if (bannedUsers.length > 0) {
        throw new Error(`Cannot add banned users to moderators: ${bannedUsers.join(', ')}`);
      }

      state.moderators = action.payload;
    },

    setBanlistList: (state, action: PayloadAction<string[]>) => {
      const invalidUsers = action.payload.filter(
        (username) => !state.users.some((u) => u.username === username),
      );

      if (invalidUsers.length > 0) {
        throw new Error(`Users not found: ${invalidUsers.join(', ')}`);
      }

      state.moderators = state.moderators.filter((username) => !action.payload.includes(username));

      state.blacklist = action.payload;
    },
  },
});

export const {
  addModerator,
  removeModerator,
  addToBlacklist,
  removeFromBlacklist,
  setBanlistList,
  setModeratorList,
} = userSlice.actions;

export default userSlice.reducer;

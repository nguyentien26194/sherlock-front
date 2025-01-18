import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  accessToken: string;
}

const initialState: UserState = {
  accessToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { changeAccessToken } = userSlice.actions;

export default userSlice.reducer;

import { ReactElement } from 'react';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { DASHBOARD_NAVIGATION } from '../Constants';

export interface SidebarState {
  currentNavigation: number;
  view: ReactElement | undefined;
}

const initialState: SidebarState = {
  currentNavigation: DASHBOARD_NAVIGATION,
  view: undefined,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeNavigation: (state, action: PayloadAction<number>) => {
      state.currentNavigation = action.payload;
    },
    changeView: (state, action: PayloadAction<ReactElement>) => {
      state.view = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeNavigation, changeView } = sidebarSlice.actions;

export default sidebarSlice.reducer;

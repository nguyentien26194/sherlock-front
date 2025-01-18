import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import sidebarReducer from '../reducers/SidebarSlice';
import userReducer from '../reducers/UserSlice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  user: userReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type AppStore = ReturnType<typeof setupStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

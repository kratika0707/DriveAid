// Redux/Store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer, { login, logout } from './Features/userslice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    // Add other reducers if needed
  },
});

export const persistor = persistStore(store);

export default { store, persistor };
const initialAuthState = JSON.parse(localStorage.getItem('auth'));

if (initialAuthState) {
  store.dispatch(login({ user: initialAuthState.user, userId: initialAuthState.userId }));
}

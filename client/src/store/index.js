import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/jobs/jobsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] 
};

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
 
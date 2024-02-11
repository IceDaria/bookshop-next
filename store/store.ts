/// <reference types="redux-persist" />
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import bookReducer from './bookReducer';
import authReducer from './authReducer';


const persistConfig = {
    key: "root",
    storage
}

const rootReducer = combineReducers ({
    books: bookReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
    
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
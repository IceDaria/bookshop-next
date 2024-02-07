import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
    books: bookReducer,
});
    
export const store = configureStore ({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
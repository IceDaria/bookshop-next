import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterReducer';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
    filter: filterReducer,
    books: bookReducer,
});
    
export const store = configureStore ({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
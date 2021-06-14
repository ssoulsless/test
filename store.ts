import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosLists from './features/todosLists/todosListsSlice';

const rootReducer = combineReducers({
	todosLists,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
	reducer: rootReducer,
});

export default store;

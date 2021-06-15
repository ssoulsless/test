import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import todosLists from './features/todosLists/todosListsSlice';

const rootReducer = combineReducers({
	todosLists,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: ['fetchTodosLists/fulfilled', 'fetchTodosLists/pending'],
		},
	}),
});

export default store;

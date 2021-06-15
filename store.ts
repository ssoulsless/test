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
		serializableCheck: false,
	}),
});

export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ListModel, List } from '../../api/types';
import { TodosActions, ActionTypes, UserState } from './types';
import * as apiClient from '../../api';
import { plainToClass } from 'class-transformer';

const initialState: UserState = {
	lists: [],
	status: 'idle',
	error: false,
};

export const fetchTodosLists = createAsyncThunk('fetchTodosLists', async () => {
	const response = await apiClient.fetchTodosLists();
	const realLists = plainToClass(List, response.data);
	return realLists;
});

const todosListsSlice = createSlice({
	name: 'todosLists',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodosLists.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTodosLists.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.lists = action.payload;
			})
			.addCase(fetchTodosLists.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export default todosListsSlice.reducer;

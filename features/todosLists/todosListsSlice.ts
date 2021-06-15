import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../api';

import { ListModel, TodoModel, List, Todo } from '../../api/types';
import {
	UserState,
	CompleteTodoParams,
	CreateListParams,
	DeleteListReturnValue,
	DeleteListParams,
	CreateTodoParams,
	EditTodoParams,
	DeleteTodoReturnValue,
	DeleteTodoParams,
} from './types';

import { plainToClass } from 'class-transformer';

const initialState: UserState = {
	lists: [],
	status: 'idle',
	error: false,
};

export const fetchTodosLists = createAsyncThunk<ListModel[]>(
	'todosLists/get',
	async () => {
		const response = await apiClient.fetchTodosLists();
		// const realTodosLists = plainToClass(List, response.data)
		// return realTodosLists
		return response.data;
	}
);

export const completeTodo = createAsyncThunk<TodoModel, CompleteTodoParams>(
	'todosLists/todo/completeTodo',
	async ({ listId, todoId }) => {
		const response = await apiClient.completeTodo(listId, todoId);
		// const realTodo = plainToClass(Todo, response.data);
		// return realTodo;
		return response.data;
	}
);

export const createList = createAsyncThunk<ListModel, CreateListParams>(
	'todosLists/create',
	async ({ title }) => {
		const response = await apiClient.createList(title);
		// const realTodosList = plainToClass(List, response.data);
		// return realTodosList;
		return response.data;
	}
);

export const deleteList = createAsyncThunk<
	DeleteListReturnValue,
	DeleteListParams
>('todosLists/delete', async ({ id }) => {
	await apiClient.deleteList(id);
	return { id };
});

export const createTodo = createAsyncThunk<TodoModel, CreateTodoParams>(
	'todosLists/todo/create',
	async ({ listId, title }) => {
		const response = await apiClient.createTodo(listId, title);
		// const realTodo = plainToClass(Todo, response.data);
		// return realTodo;
		return response.data;
	}
);

export const editTodo = createAsyncThunk<TodoModel, EditTodoParams>(
	'todosLists/todo/edit',
	async ({ listId, title, todoId }) => {
		const response = await apiClient.editTodo(listId, title, todoId);
		// const realTodo = plainToClass(Todo, response.data);
		// return realTodo;
		return response.data;
	}
);

export const deleteTodo = createAsyncThunk<
	DeleteTodoReturnValue,
	DeleteTodoParams
>('todosLists/todo/delete', async ({ listId, todoId }) => {
	await apiClient.deleteTodo(listId, todoId);
	return { listId, todoId };
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
		builder.addCase(completeTodo.fulfilled, (state, { payload }) => {
			const listIndex = state.lists.findIndex(
				(e: ListModel) => e.id === payload.list_id
			);
			const todoIndex = state.lists[listIndex].todos.findIndex(
				(e: TodoModel) => e.id === payload.id
			);
			state.lists[listIndex].todos[todoIndex] = payload;
		});
		builder.addCase(createList.fulfilled, (state, { payload }) => {
			state.lists.push(payload);
		});
		builder.addCase(deleteList.fulfilled, (state, { payload }) => {
			state.lists = state.lists.filter((item) => item.id !== payload.id);
		});
		builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
			const listIndex = state.lists.findIndex(
				(e: ListModel) => e.id === payload.listId
			);
			state.lists[listIndex].todos = state.lists[listIndex].todos.filter(
				(item: TodoModel) => item.id !== payload.todoId
			);
		});
		builder.addCase(editTodo.fulfilled, (state, { payload }) => {
			const listIndex = state.lists.findIndex(
				(e: ListModel) => e.id === payload.list_id
			);
			const todoIndex = state.lists[listIndex].todos.findIndex(
				(e: TodoModel) => e.id === payload.id
			);
			state.lists[listIndex].todos[todoIndex] = payload;
		});
	},
});

export default todosListsSlice.reducer;

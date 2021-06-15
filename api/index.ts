import axios from 'axios';

const api = axios.create({
	baseURL: 'http://mobile-dev.oblakogroup.ru/candidate/DmitriGlushchenko',
});

import { ListModel } from './types';

export const fetchTodosLists = async () => {
	return await api.get<ListModel[]>('/list');
};

export const completeTodo = async (listId: number, todoId: number) => {
	return await api.patch(`/list/${listId}/todo/${todoId}`, {
		checked: true,
	});
};

export const createList = async (title: string) => {
	return await api.post(`/list`, { title: title });
};

export const deleteList = async (id: number) => {
	return await api.delete(`/list/${id}`);
};

export const createTodo = async (listId: number, title: string) => {
	return await api.post(`/list/${listId}/todo`, {
		listId: listId,
		text: title,
	});
};

export const editTodo = async (
	listId: number,
	title: string,
	todoId: number
) => {
	return await api.patch(`/list/${listId}/todo/${todoId}`, {
		text: title,
	});
};

export const deleteTodo = async (listId: number, todoId: number) => {
	return await api.delete(`/list/${listId}/todo/${todoId}`);
};

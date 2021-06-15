import { TodoModel, ListModel, List } from '../../api/types';

export enum ActionTypes {
	FETCH_TODOS = 'FETCH_TODOS',
	CREATE_LIST = 'CREATE_LIST',
	COMPLETE_TODO = 'COMPLETE_TODO',
	DELETE_LIST = 'DELETE_LIST',
	CREATE_TODO = 'CREATE_TODO',
	DELETE_TODO = 'DELETE_TODO',
	EDIT_TODO = 'EDIT_TODO',
}

interface FetchDataAction {
	readonly type: ActionTypes.FETCH_TODOS;
	payload: List[];
}

interface CreateListAction {
	readonly type: ActionTypes.CREATE_LIST;
}

interface CompleteTodoAction {
	readonly type: ActionTypes.COMPLETE_TODO;
}

interface DeleteListAction {
	readonly type: ActionTypes.DELETE_LIST;
}

interface CreateTodoAction {
	readonly type: ActionTypes.CREATE_TODO;
}

interface DeleteTodoAction {
	readonly type: ActionTypes.DELETE_TODO;
}

interface EditTodoAction {
	readonly type: ActionTypes.EDIT_TODO;
}

export type TodosActions =
	| FetchDataAction
	| CreateListAction
	| CompleteTodoAction
	| DeleteListAction
	| CreateTodoAction
	| DeleteTodoAction
	| EditTodoAction;

export interface UserState {
	lists: any[];
	status: 'succeeded' | 'loading' | 'failed' | 'idle';
	error: boolean | null;
}

export interface CompleteTodoParams {
	listId: number;
	todoId: number;
}

export interface CreateListParams {
	title: string;
}

export interface DeleteListParams {
	id: number;
}
export interface DeleteListReturnValue {
	id: number;
}
export interface DeleteTodoReturnValue {
	listId: number;
	todoId: number;
}
export interface CreateTodoParams {
	listId: number;
	title: string;
}

export interface EditTodoParams {
	listId: number;
	title: string;
	todoId: number;
}
export interface DeleteTodoParams {
	listId: number;
	todoId: number;
}

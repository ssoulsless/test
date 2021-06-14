import axios from 'axios';

const api = axios.create({
	baseURL: 'http://mobile-dev.oblakogroup.ru/candidate/DmitriyGlushchenko',
});

import { ListModel } from './types';

export const fetchTodosLists = async () => {
	return await api.get<ListModel[]>('/list');
};

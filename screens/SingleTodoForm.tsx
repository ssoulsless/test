import React, { FC } from 'react';
import TodoForm from '../features/todosLists/TodoForm';

const SingleTodoForm: FC<{ navigation: any; route?: any }> = ({
	navigation,
	route,
}) => {
	return <TodoForm navigation={navigation} route={route} />;
};

export default SingleTodoForm;

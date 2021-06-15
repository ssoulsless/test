import React, { FC } from 'react';
import TodoForm from '../features/todosLists/TodoForm';
import {
	ProfileScreenNavigationProp,
	ProfileScreenRouteProp,
} from '../utils/navigation';

const SingleTodoForm: FC<{
	navigation: ProfileScreenNavigationProp;
	route: ProfileScreenRouteProp;
}> = ({ navigation, route }) => {
	return <TodoForm navigation={navigation} route={route} />;
};

export default SingleTodoForm;

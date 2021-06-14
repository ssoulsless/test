import React from 'react';
import { View, Text } from 'react-native';
import { useTypedSelector } from '../utils/hooks';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { fetchTodosLists } from '../features/todosLists/todosListsSlice';

const Landing = () => {
	const dispatch = useDispatch();
	const todosLists = useTypedSelector((state) => state.todosLists.lists);
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Button onPress={() => dispatch(fetchTodosLists())}>
				<Text>FETCH</Text>
			</Button>
			<Text>{todosLists.toString()}</Text>
		</View>
	);
};

export default Landing;

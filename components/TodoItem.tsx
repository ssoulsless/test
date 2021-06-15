import React from 'react';
import { List } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SwipeRightAction from './SwipeRightAction';
import SwipeLeftAction from './SwipeLeftAction';
import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { navigate } from '../utils/navigation';
import { completeTodo } from '../api';
import { TouchableOpacity } from 'react-native';

const TodoItem: FC<{
	text: string;
	isChecked: boolean;
	id: number;
	listId: number;
}> = ({ text, isChecked, id, listId }) => {
	const completeTask = async (listId: number, todoId: number) => {
		await dispatch(completeTodo(listId, todoId));
	};

	const dispatch = useDispatch();
	return (
		<Swipeable
			rightThreshold={100}
			friction={2}
			renderLeftActions={(progress, dragX) => {
				const trans = dragX.interpolate({
					inputRange: [0, 75],
					outputRange: [0, 1.25],
					extrapolate: 'clamp',
				});
				return (
					<SwipeLeftAction
						onEditPress={() => navigate('SingleTodoForm', { id, text, listId })}
						scale={trans}
					/>
				);
			}}
			renderRightActions={(progress, dragX) => {
				const trans = dragX.interpolate({
					inputRange: [-75, 0],
					outputRange: [1.25, 0],
					extrapolate: 'clamp',
				});
				return (
					<SwipeRightAction
						onDeletePress={() => completeTask(listId, id)}
						scale={trans}
					/>
				);
			}}>
			<TouchableOpacity onPress={() => completeTask(listId, id)}>
				<List.Item
					title={text}
					titleStyle={
						isChecked && {
							textDecorationLine: 'line-through',
							color: '#8b8b8b',
						}
					}
					left={() => (
						<List.Icon
							icon={!isChecked ? 'circle-outline' : 'check'}
							color="#000"
						/>
					)}
				/>
			</TouchableOpacity>
		</Swipeable>
	);
};

export default TodoItem;

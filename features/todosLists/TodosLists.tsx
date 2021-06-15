import React, { useState, FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

import { useDispatch } from 'react-redux';

import { TodoModel } from '../../api/types';

import { useTypedSelector } from '../../utils/hooks';
import TodoItem from './TodoItem';

const TodosLists: FC = () => {
	const [expanded, setExpanded] = useState<number[]>([]);
	const todosLists = useTypedSelector((state) => state.todosLists.lists);

	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			data={todosLists}
			renderItem={({ item, index }) => (
				<List.Section>
					<List.Subheader style={styles.subheader}>{item.title}</List.Subheader>
					{item.todos !== undefined &&
						item.todos.map(
							(todo: TodoModel) =>
								!todo.checked && (
									<TodoItem
										key={todo.id}
										listId={item.id}
										id={todo.id}
										text={todo.text}
										isChecked={todo.checked}
									/>
								)
						)}
					<List.Accordion
						onPress={() =>
							expanded.includes(index)
								? setExpanded(expanded.filter((e) => e !== index))
								: setExpanded(expanded.concat(index))
						}
						style={{ backgroundColor: '#fff' }}
						title="Завершенные"
						titleStyle={{ color: '#000' }}
						right={() => <View />}
						left={() => (
							<List.Icon
								icon={expanded.includes(index) ? 'chevron-up' : 'chevron-down'}
							/>
						)}>
						{item.todos !== undefined &&
							item.todos.map(
								(todo: TodoModel) =>
									todo.checked && (
										<TodoItem
											listId={item.id}
											id={todo.id}
											text={todo.text}
											isChecked={todo.checked}
											key={todo.id}
										/>
									)
							)}
					</List.Accordion>
				</List.Section>
			)}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
};

export default TodosLists;

const styles = StyleSheet.create({
	subheader: {
		textTransform: 'uppercase',
		color: '#b9b9b9',
		marginLeft: 0,
	},
});

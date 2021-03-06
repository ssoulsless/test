import React, { useState, FC } from 'react';
import { TextInput, TouchableWithoutFeedback, FlatList } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { useTypedSelector } from '../../utils/hooks';
import { useDispatch } from 'react-redux';

import { List } from 'react-native-paper';

import { deleteList, createList } from './todosListsSlice';

const CategoriesList: FC = () => {
	const [textValue, setTextValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const dispatch = useDispatch();
	const todosLists = useTypedSelector((state) => state.todosLists.lists);

	const handleValidField = (): void => {
		if (textValue === '') {
			setErrorMessage('Введите название категории');
		} else if (textValue.length >= 30) {
			setErrorMessage('Значение не должно превышать 30 символов');
		} else {
			setErrorMessage('');
			console.log('ok');
		}
	};

	const deleteCategory = (listId: number) => {
		dispatch(deleteList({ id: listId }));
	};

	const createCategory = () => {
		handleValidField();
		if (textValue !== '' && textValue.length <= 30) {
			dispatch(createList({ title: textValue }));
			setTextValue('');
		}
	};

	return (
		<View style={styles.modalWrapper}>
			<FlatList
				data={todosLists}
				renderItem={({ item }) => (
					<List.Item
						title={item.title}
						right={() => (
							<TouchableOpacity onPress={() => deleteCategory(item.id)}>
								<List.Icon
									icon="trash-can-outline"
									color="#b47786"
									style={styles.Icon}
								/>
							</TouchableOpacity>
						)}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
			<View style={styles.inputWrapper}>
				<TextInput
					maxLength={30}
					placeholder="Новая категория"
					placeholderTextColor={errorMessage === '' ? '#c2c2c2' : '#f00'}
					style={
						errorMessage === '' ? styles.categoryNameInput : styles.invalidInput
					}
					value={textValue}
					onChangeText={(value) => setTextValue(value)}
					onEndEditing={() => handleValidField()}
				/>
				<TouchableWithoutFeedback onPress={() => createCategory()}>
					<View>
						<List.Icon icon="plus" style={styles.Icon} color="#a5a5a5" />
					</View>
				</TouchableWithoutFeedback>
			</View>
			{errorMessage !== '' && (
				<Text style={styles.errorMessage}>{errorMessage}</Text>
			)}
		</View>
	);
};

export default CategoriesList;

const styles = StyleSheet.create({
	modal: {
		flexShrink: 1,
		justifyContent: 'flex-end',
		marginBottom: 0,
	},
	modalWrapper: {
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		borderRadius: 9,
		paddingBottom: 32,
	},
	errorMessage: {
		color: '#f00',
		fontSize: 12,
		textAlign: 'center',
		marginTop: 10,
	},
	invalidInput: {
		flex: 1,
		borderColor: '#f00',
		borderBottomWidth: 0.5,
		fontSize: 16,
	},
	Icon: {
		margin: 0,
	},
	inputWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 16,
		paddingRight: 8,
	},
	categoryNameInput: {
		fontSize: 16,
	},
});

import React, { FC, useCallback, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchTodosLists } from '../features/todosLists/todosListsSlice';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { FAB, Modal } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import CategoriesList from '../features/todosLists/CategoriesList';
import TodosLists from '../features/todosLists/TodosLists';

import { ProfileScreenNavigationProp } from '../utils/navigation';

const Landing: FC<{ navigation: ProfileScreenNavigationProp }> = ({
	navigation,
}) => {
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useFocusEffect(
		useCallback(() => {
			dispatch(fetchTodosLists());
		}, [])
	);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}>
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<View style={{ flex: 1 }} />
					<View style={styles.headerContentWrapper}>
						<Text style={styles.titleText}>Задачи</Text>
						<TouchableOpacity onPress={() => setIsModalOpen(true)}>
							<MaterialCommunityIcons name="folder-plus" size={26} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.contentWrapper}>
					<TodosLists />
				</View>
				{!isModalOpen && (
					<FAB
						onPress={() => navigation.navigate('SingleTodoForm')}
						icon="plus"
						animated={true}
						color="#fff"
						style={styles.fab}
					/>
				)}
				<Modal
					style={styles.modal}
					dismissable={true}
					visible={isModalOpen}
					onDismiss={() => setIsModalOpen(false)}>
					<CategoriesList />
				</Modal>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Landing;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: '#fff',
	},
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentWrapper: {
		flex: 4,
	},
	titleText: {
		fontSize: 26,
		fontWeight: '500',
	},
	headerContentWrapper: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 4,
	},
	fab: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		margin: 16,
		backgroundColor: '#1e76fb',
	},
	modal: {
		flexShrink: 1,
		justifyContent: 'flex-end',
		marginBottom: 0,
		marginTop: 150,
	},
	modalWrapper: {
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		borderRadius: 9,
		paddingBottom: 32,
	},
	Icon: {
		margin: 0,
	},
	buttonTitle: {
		color: '#a5a5a5',
	},
	subheader: {
		textTransform: 'uppercase',
		color: '#b9b9b9',
		marginLeft: 0,
	},
});

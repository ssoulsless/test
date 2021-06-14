import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './utils/navigation';
const Stack = createStackNavigator();

import SingleTodoFormScreen from './screens/SingleTodoForm';
import LandingScreen from './screens/Landing';

import { Provider } from 'react-redux';
import store from './store';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator initialRouteName="Landing">
					<Stack.Screen
						name="Landing"
						component={LandingScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="SingleTodoForm"
						component={SingleTodoFormScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

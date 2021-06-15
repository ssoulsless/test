import { NavigationContainerRef } from '@react-navigation/core';
import * as React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (screenName: string, props: any) => {
	navigationRef.current?.navigate(screenName, props);
};

export type RootStackParamList = {
	Landing: undefined;
	SingleTodoForm?: { text: string; listId: number; id: number };
};

export type ProfileScreenRouteProp = RouteProp<
	RootStackParamList,
	'SingleTodoForm'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'SingleTodoForm'
>;

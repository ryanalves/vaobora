import React from "react-native";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/screens/home";
import LoginScreen from "./src/screens/login";
import RegistroScreen from "./src/screens/registro";
import AuthService from "./src/services/auth.service";
import LoadingScreen from "./src/screens/loading";

const authService = AuthService.getInstance();

const Stack = createNativeStackNavigator();

const App = () => {
	const [isLoading, setIsLoading] = useState(null);
	const [user, setUser] = useState(null);
	useEffect(() => {
		let loadingSub = authService.$isLoading.subscribe((isLoading) => {
			setIsLoading(isLoading);
		});
		let userSub = authService.$user.subscribe((user) => {
			setUser(user);
		});

		return () => {
			loadingSub.unsubscribe();
			userSub.unsubscribe();
		};
	}, [setIsLoading, setUser]);

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{isLoading ? (
					<>
						<Stack.Screen name="Loading" component={LoadingScreen} />
					</>
				) : user ? (
					<>
						<Stack.Screen name="Home" component={HomeScreen} />
					</>
				) : (
					<>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Registro" component={RegistroScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;

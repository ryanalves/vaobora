import React, { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ContaScreen from "./conta";
import CaronaScreen from "./caronas";
import PaginaInicialScreen from "./paginaInicial";

const Tabs = createBottomTabNavigator();

const HomeScreen = () => {
	return (
		<Tabs.Navigator screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="Página Inicial"
				component={PaginaInicialScreen}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="Caronas"
				component={CaronaScreen}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="car" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="Conta"
				component={ContaScreen}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
				}}
			/>
		</Tabs.Navigator>
	);
};

const styles = StyleSheet.create({});

export default HomeScreen;

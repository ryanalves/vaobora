import React, { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthService from "../../services/auth.service";

const authService = AuthService.getInstance();
const HomeScreen = ({ navigation }) => {
	const logout = () => {
		authService.logout();
	};
	return (
		<View style={styles.container}>
			<Text>Home</Text>
			<TouchableOpacity onPress={() => logout()}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default HomeScreen;

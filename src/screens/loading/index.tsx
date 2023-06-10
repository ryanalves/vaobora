import React, {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const LoadingScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Carregando...</Text>
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

export default LoadingScreen;

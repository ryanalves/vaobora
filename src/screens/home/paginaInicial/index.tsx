import React, { StyleSheet, Text, View } from "react-native";

const PaginaInicialScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Página Inicial</Text>
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

export default PaginaInicialScreen;

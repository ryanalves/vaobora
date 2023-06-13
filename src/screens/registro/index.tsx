import React, { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthService from "../../services/auth.service";

const authService = AuthService.getInstance();

const RegistroScreen = ({ navigation }) => {
	const goToLogin = () => {
		navigation.navigate("Login");
	};

	const onSubmit = () => {};

	return (
		<View style={styles.container}>
			<Image style={styles.icon} source={require("../../assets/van.png")} />
			<View style={styles.formGroup}>
				<Text>Nome Completo</Text>
				<TextInput style={styles.input}></TextInput>
			</View>
			<View style={styles.formGroup}>
				<Text>Email</Text>
				<TextInput style={styles.input}></TextInput>
			</View>
			<View style={styles.formGroup}>
				<Text>Senha</Text>
				<TextInput style={styles.input}></TextInput>
			</View>

			<TouchableOpacity onPress={() => goToLogin()}>
				<Text style={styles.register}>
					Já possui uma conta?
					<Text style={{ color: "blue" }}> Faça login! </Text>
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
				<Text style={styles.buttonText}>Registrar</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	icon: {
		width: "50%",
		height: 80,
		resizeMode: "contain",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	formGroup: {
		width: "50%",
	},
	register: {
		fontSize: 11,
		marginTop: 10,
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#ccc",
		marginBottom: 10,
		paddingHorizontal: 5,
		width: "100%",
	},
	button: {
		backgroundColor: "#007bff",
		padding: 10,
		paddingHorizontal: 25,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
	},
});

export default RegistroScreen;

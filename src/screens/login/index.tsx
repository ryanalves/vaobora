import React, { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, Image } from "react-native";
import { useState } from "react";
import AuthService from "../../services/auth.service";

const authService = AuthService.getInstance();

const LoginScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	const goToRegister = () => {
		navigation.navigate("Registro");
	};

	const onSubmit = () => {
		setIsLoading(true);
		authService
			.login({ email, senha })
			.catch((err) => {
				Alert.alert("Oops!", err.message, [{ text: "OK" }]);
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			{isLoading && (
				<View style={{ ...styles.container, ...styles.absolute }}>
					<ActivityIndicator />
				</View>
			)}
			<View style={styles.container}>
				<Image style={styles.icon} source={require("../../assets/van.png")} />
				<View style={styles.formGroup}>
					<Text> Email </Text>
					<TextInput
						textContentType="emailAddress"
						style={styles.input}
						onChangeText={(value: string) => setEmail(value.toLocaleLowerCase().trim())}
					></TextInput>
				</View>
				<View style={styles.formGroup}>
					<Text> Senha </Text>
					<TextInput
						textContentType="password"
						secureTextEntry={true}
						style={styles.input}
						onChangeText={(value: string) => setSenha(value)}
					></TextInput>
				</View>

				<TouchableOpacity onPress={() => goToRegister()}>
					<Text style={styles.register}>
						Não possui uma conta?
						<Text style={{ color: "blue" }}> Registre-se! </Text>
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
					<Text style={styles.buttonText}> Login </Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	icon: {
		width: "50%",
		height: 80,
		resizeMode: "contain"
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	absolute: {
		position: "absolute",
		zIndex: 100,
		width: "100%",
		height: "100%",
		backgroundColor: "#fff8",
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

export default LoginScreen;

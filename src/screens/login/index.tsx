import React, {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";
import { useState } from "react";
import AuthService from "../../services/auth.service";

const authService = AuthService.getInstance();

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	const goToRegister = () => {
		navigation.navigate("Registro");
	};

	const onSubmit = async () => {
		let user = await authService.login(email, senha);
		if (!user) {
			Alert.alert("Oops!", "Credenciais Inválidas. Tente novamente", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.formGroup}>
				<Text> Email </Text>
				<TextInput
					style={styles.input}
					onChangeText={(value: string) => setEmail(value)}
				></TextInput>
			</View>
			<View style={styles.formGroup}>
				<Text> Senha </Text>
				<TextInput
					style={styles.input}
					onChangeText={(value: string) => setSenha(value)}
				></TextInput>
			</View>

			<TouchableOpacity onPress={() => goToRegister()}>
				<Text style={styles.register}>
					Não possui uma conta? Registre-se!
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
				<Text style={styles.buttonText}> Login </Text>
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
		borderColor: "#ccc",
		marginBottom: 10,
		width: "100%",
	},
	button: {
		backgroundColor: "#090",
		padding: 10,
		width: "50%",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
	},
});

export default LoginScreen;

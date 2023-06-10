import React, {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import AuthService from "../../services/auth.service";

const authService = AuthService.getInstance();

const RegistroScreen = ({ navigation }) => {
	const goToLogin = () => {
		navigation.navigate("Login");
	};

	const onSubmit = () => {
		authService.login("ryan@gmail.com", "123456789");
	};

	return (
		<View style={styles.container}>
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
					Já possui uma conta? Faça login!
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
				<Text style={styles.buttonText}>Registrar</Text>
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

export default RegistroScreen;

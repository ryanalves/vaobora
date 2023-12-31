import { SERVER_URL } from "../common/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { IUsuario } from "../types/usuario";

export default class AuthService {
	private static instance?: AuthService = undefined;
	static getInstance() {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	public readonly $isLoading = new BehaviorSubject<boolean>(true);
	public readonly $user = new BehaviorSubject<IUsuario | null>(null);
	public token: string = "";

	private constructor() {
		AsyncStorage.getItem("access_token").then(async (token) => {
			if (token) {
				this.token = token;
				await this.getUser();
			}
			this.$isLoading.next(false);
		});
	}

	async login(credenciais: { email: string; senha: string }): Promise<IUsuario> {
		return axios
			.post(
				`${SERVER_URL}/auth/login`,
				{
					email: credenciais.email,
					senha: credenciais.senha,
				},
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					timeout: 5000,
				}
			)
			.then(async (result: any) => {
				const data = result.data;
				this.token = data.access_token;
				await AsyncStorage.setItem("access_token", this.token);
				return await this.getUser();
			})
			.catch(async (err) => {
				await AsyncStorage.removeItem("access_token");
				this.$user.next(null);
				if (err.response?.status == "401") {
					throw Error("Credenciais Inválidas. Tente novamente");
				}
				throw Error("Erro ao fazer login");
			});
	}

	async getUser(): Promise<IUsuario> {
		return axios
			.get(`${SERVER_URL}/auth`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			})
			.then((res) => {
				if (!res.data) throw Error("");
				this.$user.next(res.data);
				return res.data;
			});
	}

	async logout() {
		await AsyncStorage.removeItem("access_token");
		this.$user.next(null);
	}
}

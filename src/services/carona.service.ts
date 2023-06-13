import { SERVER_URL } from "../common/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BehaviorSubject } from "rxjs";
import AuthService from "./auth.service";
import { ICarona } from "../types/carona";

export default class CaronaService {
	private static instance?: CaronaService = undefined;
	static getInstance() {
		if (!CaronaService.instance) {
			CaronaService.instance = new CaronaService();
		}
		return CaronaService.instance;
	}

	private token: string = "";

	authService: AuthService;
	private constructor() {
		this.authService = AuthService.getInstance();
	}

	async find(args?: any): Promise<ICarona[]> {
		// carona/find
		return axios
			.post(
				`${SERVER_URL}/carona/find`,
				{ ...args },
				{
					headers: {
						Authorization: this.authService.token,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
			.then(async (result: any) => {
				const data = result.data;
				return data;
			})
			.catch(async (err) => {
				throw err;
			});
	}
}

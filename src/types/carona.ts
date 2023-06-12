import { IUsuario } from "./usuario";

export interface ICarona {
	id: number;
	saida: string;
	saidaHorario: string;
	chegada: string;
	chegadaHorario: string;
	valor: number;
	motorista?: IUsuario;
}

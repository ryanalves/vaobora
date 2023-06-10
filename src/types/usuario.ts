export class IMotorista {
	cnh: string;
	modeloVeiculo: string;
	placaVeiculo: string;
}

export interface IUsuario {
	id: number;
	motorista: IMotorista;
	email: string;
	telefone: string;
	nomeCompleto: string;
	senha: string;
	termos: boolean;
	// endereco: Endereco;
	// caronaOfertada?: Carona[];
}

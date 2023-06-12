import { useState, useEffect } from "react";
import React, { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CaronaService from "../../../services/carona.service";
import { ICarona } from "../../../types/carona";

const caronaService = CaronaService.getInstance();

const ordenacoes = [
	{ key: "saida_cedo", label: "Saída mais cedo" },
	{ key: "preco_baxio", label: "Preço mais baixo" },
	{ key: "proximidade_origem", label: "Proximidade da origem" },
	{ key: "proximidade_destino", label: "Proximidade do destino" },
];
// const caronas = Array(5).fill(Math.random()); // Implementar backend

const CaronaScreen = () => {
	const [caronas, setCaronas] = useState<ICarona[]>([]);
	const [origem, setOrigem] = useState("");
	const [destino, setDestino] = useState("");
	const [pessoas, setPessoas] = useState(1);
	const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState("saida_cedo");

	const selecionarOrdem = (ordenacao: any) => {
		setOrdenacaoSelecionada(ordenacao.key);
	};

	const pesquisarCaronas = () => {
		caronaService
			.find({
				futuro: true,
			})
			.then((caronas) => {
				setCaronas(caronas);
				console.log(caronas.length);
			});
	};

	const formatarPreco = (preco: string | number) => {
		let precoStr = parseFloat(preco.toString()).toFixed(2);
		return precoStr.replaceAll(",", "#").replaceAll(".", ",").replaceAll("#", ".");
	};

	const formatarHorario = (horario: string) => {
		let horarioCompleto = new Date(horario).toLocaleTimeString();
		let horarioArr = horarioCompleto.split(":");
		horarioArr.pop();
		return horarioArr.join(":");
	};

	useEffect(pesquisarCaronas, []);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.pesquisa}>
					<View style={styles.campos}>
						<View style={{ flex: 1 }}>
							<View style={styles.form_group}>
								<Text>Origem</Text>
								<TextInput style={styles.input} value={origem} onChangeText={(inp) => setOrigem(inp)}></TextInput>
							</View>
							<View style={styles.form_group}>
								<Text>Destino</Text>
								<TextInput style={styles.input} value={destino} onChangeText={(inp) => setDestino(inp)}></TextInput>
							</View>
						</View>
						<View style={{ width: 130 }}>
							<View style={styles.form_group}>
								<Text>Pessoas</Text>
								<TextInput
									style={styles.input}
									value={pessoas.toString()}
									onChangeText={(inp) => setPessoas(+inp)}
								></TextInput>
							</View>
							<View style={styles.form_group}>
								<Text>{""}</Text>
								<TouchableOpacity style={styles.button_pesquisar}>
									<Text style={{ color: "white" }}>Encontrar carona</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={{ width: "95%" }}>
						<Text>Ordenar </Text>
						{ordenacoes.map((ordenacao) => (
							<TouchableOpacity style={styles.ordenacao} onPress={() => selecionarOrdem(ordenacao)}>
								<Text style={styles.ordenacao_texto}>{ordenacao.label}</Text>
								<View
									style={
										ordenacaoSelecionada == ordenacao.key
											? [styles.ordenacao_checkbox, styles.ordenacao_checkbox_selecionado]
											: [styles.ordenacao_checkbox]
									}
								></View>
							</TouchableOpacity>
						))}
					</View>
				</View>
				<ScrollView style={styles.caronas}>
					{caronas.map((carona, index) => (
						<View key={index} style={styles.carona}>
							<View style={styles.carona_preco}>
								<Text>R$ {formatarPreco(carona.valor)}</Text>
							</View>
							<View style={styles.carona_info}>
								<Text>
									{formatarHorario(carona.saidaHorario)} {carona.saida}
								</Text>
								<Text>
									{formatarHorario(carona.chegadaHorario)} {carona.chegada}
								</Text>
							</View>
							<View style={styles.carona_motorista}>
								<Text> {carona.motorista?.nomeCompleto} </Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
			<View style={styles.addCaronaContainer}>
				<TouchableOpacity style={styles.addCarona}>
					<MaterialCommunityIcons name="plus" color={"white"} size={30} />
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	pesquisa: {
		height: 270,
		paddingTop: 40,
		alignItems: "center",
	},
	form_group: {
		marginHorizontal: 5,
		marginBottom: 10,
	},
	campos: {
		marginHorizontal: 5,
		flexDirection: "row",
	},

	input: {
		borderWidth: 1,
		borderColor: "#bbb",
		borderRadius: 5,
	},
	button_pesquisar: {
		backgroundColor: "#06f",
		alignItems: "center",
		justifyContent: "center",
		height: 30,
		borderRadius: 5,
	},
	ordenacao: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 2,
	},
	ordenacao_texto: {},
	ordenacao_checkbox: {
		width: 16,
		height: 16,
		borderWidth: 0.5,
		borderRadius: 12,
	},
	ordenacao_checkbox_selecionado: {
		backgroundColor: "lightgreen",
	},
	addCaronaContainer: {
		flex: 1,
		position: "absolute",
		bottom: 15,
		right: 15,
		height: 50,
		width: 50,
		zIndex: 10,
	},
	addCarona: {
		backgroundColor: "#06f",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
	},
	caronas: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#fff",
	},
	carona: {
		flex: 1,
		height: 100,
		padding: 10,
		marginVertical: 10,
		marginHorizontal: 10,
		borderRadius: 5,
		backgroundColor: "#fff",
		elevation: 5,
		flexDirection: "column",
	},
	carona_info: {
		flex: 2,
	},
	carona_motorista: {
		flex: 1,
	},
	carona_horario: {
		width: 40,
		backgroundColor: "red",
	},
	carona_preco: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});

export default CaronaScreen;

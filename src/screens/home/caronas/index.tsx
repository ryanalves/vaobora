import { useState, useEffect } from "react";
import React, { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CaronaService from "../../../services/carona.service";
import { ICarona } from "../../../types/carona";
import dayjs from "dayjs";

const caronaService = CaronaService.getInstance();

const ordenacoes = [
	{ key: "saidaCedo", label: "Saída mais cedo" },
	{ key: "saidaTarde", label: "Saída mais tarde" },
	{ key: "precoBaixo", label: "Preço mais baixo" },
	{ key: "precoAlto", label: "Preço mais alto" },
];
// const caronas = Array(5).fill(Math.random()); // Implementar backend

const CaronaScreen = () => {
	const [caronas, setCaronas] = useState<ICarona[]>([]);
	const [saida, setSaida] = useState("");
	const [chegada, setChegada] = useState("");
	const [vagas, setVagas] = useState(1);
	const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState(ordenacoes[0].key);

	const selecionarOrdem = (ordenacao: any) => {
		setOrdenacaoSelecionada(ordenacao.key);
	};

	const pesquisarCaronas = () => {
		caronaService.find({ futuro: true, saida, chegada, vagas, filtro: ordenacaoSelecionada }).then((caronas) => {
			setCaronas(caronas);
		});
	};

	const formatarPreco = (preco: string | number) => {
		let precoStr = parseFloat(preco.toString()).toFixed(2);
		return precoStr.replaceAll(",", "#").replaceAll(".", ",").replaceAll("#", ".");
	};

	const formatarHorario = (horario: string) => {
		let date = dayjs(horario);
		if (date.isBefore(dayjs().endOf("day"))) {
			return date.format("HH:mm");
		}
		return date.format("DD/MM HH:mm");
	};

	useEffect(() => pesquisarCaronas(), []);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.pesquisa}>
					<View style={styles.campos}>
						<View style={{ flex: 1 }}>
							<View style={styles.form_group}>
								<Text>Saida</Text>
								<TextInput style={styles.input} value={saida} onChangeText={(inp) => setSaida(inp)}></TextInput>
							</View>
							<View style={styles.form_group}>
								<Text>Chegada</Text>
								<TextInput style={styles.input} value={chegada} onChangeText={(inp) => setChegada(inp)}></TextInput>
							</View>
						</View>
						<View style={{ width: 130 }}>
							<View style={styles.form_group}>
								<Text>Vagas</Text>
								<TextInput
									style={styles.input}
									textAlign="center"
									value={vagas.toString()}
									onChangeText={(inp) => setVagas(+inp)}
								></TextInput>
							</View>
							<View style={styles.form_group}>
								<Text>{""}</Text>
								<TouchableOpacity style={styles.button_pesquisar} onPress={() => pesquisarCaronas()}>
									<Text style={{ color: "white" }}>Encontrar carona</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={{ flex: 1, width: "95%", justifyContent: "center" }}>
						{ordenacoes.map((ordenacao) => (
							<TouchableOpacity key={ordenacao.key} style={styles.ordenacao} onPress={() => selecionarOrdem(ordenacao)}>
								<View style={styles.ordenacao_label}>
									<MaterialCommunityIcons name="clock-outline" color={"gray"} size={15} />
									<Text style={styles.ordenacao_label_texto}>{ordenacao.label}</Text>
								</View>
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
						<View key={carona.id} style={styles.carona}>
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
								<View style={styles.carona_motorista_foto}>
									<MaterialCommunityIcons name="account" color={"lightblue"} size={30} />
								</View>
								<View style={styles.carona_motorista_dados}>
									<Text> {carona.motorista?.nomeCompleto} </Text>
									<Text> {carona.motorista.motorista.modeloVeiculo} </Text>
								</View>
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
		paddingTop: 15,
		paddingHorizontal: 10,
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
		paddingHorizontal: 5,
	},
	button_pesquisar: {
		backgroundColor: "#007bff",
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
	ordenacao_label: {
		flexDirection: "row",
		alignItems: "center",
		gap: 7,
	},
	ordenacao_label_texto: {},
	ordenacao_checkbox: {
		width: 16,
		height: 16,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: "lightgray",
	},
	ordenacao_checkbox_selecionado: {
		borderWidth: 5,
		borderColor: "#007bff",
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
		flex: 1,
	},
	carona_motorista: {
		flex: 1,
		alignItems: "center",
		gap: 5,
		justifyContent: "center",
		flexDirection: "row",
	},
	carona_motorista_foto: {
		width: 35,
		height: 35,
		borderRadius: 50,
		borderWidth: 1.5,
		borderColor: "lightblue",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	carona_motorista_dados: {
		flex: 1,
		justifyContent: "center",
	},
	carona_horario: {
		width: 40,
	},
	carona_preco: {
		position: "absolute",
		backgroundColor: "white",
		padding: 3,
		top: 7,
		right: 7,
	},
});

export default CaronaScreen;

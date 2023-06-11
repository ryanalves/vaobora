import { useState } from "react";
import React, { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CaronaScreen = () => {
	const caronas = Array(5).fill(Math.random());
	return (
		<>
			<View style={styles.addCaronaContainer}>
				<TouchableOpacity style={styles.addCarona}>
					<MaterialCommunityIcons name="plus" color={"white"} size={30} />
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
				<View style={styles.pesquisa}>
					<Text>Pesquisar</Text>
				</View>
				<ScrollView style={styles.caronas}>
					{caronas.map((carona, index) => (
						<View key={carona + index} style={styles.carona}>
							<View style={styles.carona_preco}>
								<Text>R$ 12,50</Text>
							</View>
							<View style={styles.carona_info}>
								<Text>16:30 Local de Saída</Text>
								<Text>16:45 Local de Chegada</Text>
							</View>
							<View style={styles.carona_motorista}>
								<Text>4.9 - Usuario</Text>
							</View>
						</View>
					))}
				</ScrollView>
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
		height: "35%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
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

import React from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	FlatList,
	Pressable
} from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function Topping({ id, item, isChecked, handleChange, price }) {
	return (
		<View style={styles.item}>
			<Pressable
				onPress={() => handleChange(id)}
				style={{
					flexDirection: "row",
					flex: 1,
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				<Text style={styles.textStyle}>
					{item}
				</Text>
				<View style={{ flexDirection: "row" }}>
					<Text style={styles.textStyle}>
						+{price} VND{" "}
					</Text>
					<MaterialCommunityIcons
						name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
						size={24}
						color="blue"
					/>
				</View>
			</Pressable>
		</View>
	);
}
export default function ToppingList({drinks,index, setDrinks}) {
	const handleChange = id => {
		let temp = drinks[index]["topping"].map(product => {
			if (id === product.id) {
				return { ...product, isChecked: !product.isChecked };
			}
			return product;
		});
		const newDrinks = [...drinks];
		newDrinks[index]["topping"] = temp;
		setDrinks(newDrinks);
	};
	const renderFlatList = renderData => {
		return (
			<FlatList
				data={renderData}
				renderItem={({ item }) =>
					<Card style={{ margin: 5 }}>
						<View style={styles.card}>
							<Topping
								id={item.id}
								item={item.item}
								isChecked={item.isChecked}
								handleChange={handleChange}
								price={item.price}
							/>
						</View>
					</Card>}
			/>
		);
	};
	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				{renderFlatList(drinks[index]["topping"])}
			</View>
			<StatusBar />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	},
	item: {
		height: 45,
		marginVertical: 6,
		marginHorizontal: 20,
		borderRadius: 25
	},
	title: {
		fontSize: 24,
		marginLeft: 30,
		color: "#229E5C",
		fontWeight: "bold",
		marginTop: 20
	},
	textStyle: {
		color: "blue",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 20
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	checkbox: {
		margin: 8
	}
});

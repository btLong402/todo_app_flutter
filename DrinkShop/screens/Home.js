import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	Modal,
	ToastAndroid
} from "react-native";
import DrinkList from "../components/DrinkList";
import ToppingList from "../components/ToppingList";
import Search from "../components/Search";
import { getSelected, setSelected } from "../assets/DATA/Cart";
import Drinks from "../assets/DATA/Drinks";
export default (HomeScreen = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [ind, setInd] = useState();
	const [drinks, setDrinks] = useState(Drinks());
	const [totalChoice, setTotalChoice] = useState(0);
	const handleCancel = () => {
		let tmp = drinks[ind]["topping"].map(toppings => {
			if (toppings.isChecked) {
				return { ...toppings, isChecked: !toppings.isChecked };
			}
			return toppings;
		});
		let newDrink = [...drinks];
		newDrink[ind]["isChecked"] = false;
		newDrink[ind]["topping"] = tmp;
		setDrinks(newDrink);
		if(totalChoice !== 0){
			setTotalChoice(totalChoice - 1);
		}
	};
	const handlePlace = () => {
		let newDrink = [...drinks];
		newDrink[ind]["isChecked"] = true;
		setDrinks(newDrink);
		setTotalChoice(totalChoice + 1);
	};
	const handleSave = () => {
		let selected = drinks.filter(drink => drink.isChecked).map(drink => {
			const selectedToppings = drink.topping.filter(
				topping => topping.isChecked
			);
			const toppingsPrice = selectedToppings.reduce(
				(total, topping) => total + topping.price,
				0
			);
			return {
				name: drink.name,
				toppings: selectedToppings.map(topping => topping.item),
				price: drink.price + toppingsPrice
			};
		});
		const totalPrice = selected.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.price;
		}, 0);
		setSelected(selected);
		return totalPrice;
	};
	return (
		<SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
			<View
				style={{ width: "100%", height: "100%", backgroundColor: "#E9E6E6" }}
			>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={{ flex: 1, flexDirection: "column-reverse" }}>
						<View style={styles.modalView}>
							<View style={{ width: "100%", height: "100%" }}>
								<View
									style={{
										marginTop: 10,
										flexDirection: "row",
										justifyContent: "space-between"
									}}
								>
									<View style={{ marginLeft: 10 }}>
										<TouchableOpacity
											style={[styles.button, styles.buttonClose]}
											onPress={() => {
												setModalVisible(!modalVisible);
												handleCancel();
												ToastAndroid.show(
													"Cancel Successfully !",
													ToastAndroid.SHORT
												);
											}}
										>
											<Text style={styles.textStyle}>Cancel</Text>
										</TouchableOpacity>
									</View>
									<View style={{ marginRight: 10 }}>
										<TouchableOpacity
											style={[styles.button, styles.buttonOpen]}
											onPress={() => {
												setModalVisible(!modalVisible);
												{
													drinks[ind]["isChecked"] === true
														? ToastAndroid.show(
																"Update Successfully !",
																ToastAndroid.SHORT
															)
														: ToastAndroid.show(
																"Order Successfully !",
																ToastAndroid.SHORT
															);
												}
												handlePlace();
											}}
										>
											<Text style={styles.textStyle}>Place</Text>
										</TouchableOpacity>
									</View>
								</View>
								<ToppingList
									drinks={drinks}
									index={ind}
									setDrinks={setDrinks}
								/>
							</View>
						</View>
					</View>
				</Modal>
				<View style={{ width: "100%", height: "25%" }}>
					<Search navigation={navigation} />
				</View>
				<View style={{ width: "100%", height: "4%" }}>
					<Text
						style={{
							fontSize: 25,
							fontStyle: "italic",
							color: "#229E5C",
							marginLeft: 30
						}}
					>
						List of drink
					</Text>
					<View
						style={{
							height: 1,
							width: "32%",
							borderWidth: 1,
							marginLeft: 29,
							borderColor: "#707070"
						}}
					/>
				</View>
				<View style={{ width: "100%", height: "61%", marginTop: 10 }}>
					<DrinkList
						drinks={drinks}
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						setInd={setInd}
					/>
				</View>
				<View style={{ width: "100%", height: "6%" }}>
					<Payment_Button
						navigation={navigation}
						handleSave={handleSave}
						getSelected={getSelected}
						totalChoice={totalChoice}
						drinks={drinks}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
});

const Payment_Button = ({
	navigation,
	handleSave,
	getSelected,
	totalChoice,
	drinks
}) => {
	return (
		<TouchableOpacity
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 25,
				backgroundColor: totalChoice === 0 ? "gray" : "green"
			}}
			disabled={totalChoice === 0}
			onPress={() => {
				let ttp = handleSave();
				navigation.navigate("Payment", {
					totalChoice: totalChoice,
					drinks: drinks,
					selected: getSelected(),
					totalPrice: ttp
				});
			}}
		>
			<Text style={{ fontSize: 25 }}>Order</Text>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	},
	item: {
		backgroundColor: "#ffffff",
		height: 90,
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
	modalView: {
		borderRadius: 20,
		width: "100%",
		height: "55%",
		borderWidth: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: 100,
		height: 50,
		alignItems: "center",
		justifyContent: "center"
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "#2196F3"
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	checkbox: {
		margin: 8
	}
});

import React, { useState, useEffect, Component } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Alert,
	StyleSheet,
	Modal,
	Pressable
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default (Payment = ({ navigation, route }) => {
	const [selectedValue, setSelectedValue] = useState("apple");
	const [modalVisible, setModalVisible] = useState(false);
	const { selected, totalPrice } = route.params;
	const [remainingTime, setRemainingTime] = useState();
	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(prevTime => prevTime - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	const handleConfirm = () => {
		Alert.alert("Confirmation", "Are you sure you want to order?", [
			{
				text: "Cancel",
				style: "cancel"
			},
			{
				text: "Yes",
				onPress: () => {
					setRemainingTime(5);
					setModalVisible(!modalVisible);
				}
			}
		]);
	};
	const handleBack = () => {
		Alert.alert("Notification","Are you sure you want to back?", [
			{
				text: "Cancel",
				style: "cancel"
			},
			{
				text: "Yes",
				onPress: () => navigation.goBack()
			}
		]);
	}
	return (
		<SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
			<View style={{ width: "100%", height: "100%" }}>
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							{remainingTime > 0
								? <Text style={styles.textStyle}>
										Preparing: {remainingTime} seconds
									</Text>
								: <Text style={styles.textStyle}>Order Successfully!</Text>}
							{remainingTime <= 0 &&
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => {
										setModalVisible(!modalVisible);
										navigation.navigate("Home");
									}}
								>
									<Text style={styles.textStyle}>OK</Text>
								</Pressable>}
						</View>
					</View>
				</Modal>
				<View style={{ width: "100%", height: "60%" }}>
					<View style={{ width: "100%", height: 40, flexDirection: "row" }}>
						<Pressable style={{ justifyContent: "center", alignContent: "center" }}
							onPress ={() => handleBack()}
						>
							<MaterialCommunityIcons
								name={"arrow-left"}
								size={24}
								color="black"
							/>
						</Pressable>
						<Text
							style={{ fontSize: 25, width: 150, justifyContent: "center", marginLeft: 120 }}
						>
							ĐƠN HÀNG
						</Text>
					</View>
					{selected.map((item, index) =>
						<View
							key={index}
							style={{
								width: "100%",
								height: 80,
								justifyContent: "center",
								backgroundColor: "white",
								marginVertical: 6,
								borderRadius: 25
							}}
						>
							<Text style={{ fontSize: 15, paddingLeft: 20 }}>
								Tên đồ uống : {item.name}
							</Text>
							<Text style={{ fontSize: 15, paddingLeft: 20 }}>
								Giá: {item.price} (VND){" "}
							</Text>
							{item.toppings[0] &&
								<Text style={{ fontSize: 15, paddingLeft: 20 }}>
									Topping: {item.toppings.join(", ")}
								</Text>}
						</View>
					)}
				</View>
				<View style={{ width: "100%", height: "30%" }}>
					<View style={{ width: "100%", height: "50%" }}>
						<Text
							style={{
								fontSize: 25,
								paddingLeft: 10,
								justifyContent: "center"
							}}
						>
							THANH TOÁN
						</Text>
						<View
							style={{
								width: "100%",
								height: 80,
								justifyContent: "center",
								backgroundColor: "white",
								marginVertical: 6
							}
							// borderRadius: 25,
							}
						>
							<Text style={{ fontSize: 20, paddingLeft: 20 }}>
								Tổng số tiền: {totalPrice} (VND)
							</Text>
						</View>
					</View>
					<View
						style={{
							width: "100%",
							height: 40,
							flexDirection: "row",
							justifyContent: "space-around"
						}}
					>
						<Text
							style={{
								fontSize: 25,
								paddingLeft: 10,
								width: 200,
								justifyContent: "center"
							}}
						>
							PHƯƠNG THỨC
						</Text>
						<View
							style={{ borderWidth: 1, width: 200, justifyContent: "center" }}
						>
							<Picker
								selectedValue={selectedValue}
								onValueChange={(itemValue, itemIndex) =>
									setSelectedValue(itemValue)}
							>
								<Picker.Item
									label="Cash"
									value="apple"
									style={{ fontSize: 25, justifyContent: "center" }}
								/>
								<Picker.Item
									label="Credit Card"
									value="banana"
									style={{ fontSize: 25, justifyContent: "center" }}
								/>
								<Picker.Item
									label="Banking"
									value="orange"
									style={{ fontSize: 25, justifyContent: "center" }}
								/>
							</Picker>
						</View>
					</View>
				</View>
				<View
					style={{
						width: "100%",
						height: "10%",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: "yellow",
							width: "100%",
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 25
						}}
						onPress={() => handleConfirm()}
					>
						<Text>Order</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
});
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
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
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "#2196F3"
	},
	textStyle: {
		color: "black",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		color: "black"
	}
});

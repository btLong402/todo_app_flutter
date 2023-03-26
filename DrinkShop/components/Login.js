
import React, { useState } from "react";
import {
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Dimensions
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import {app} from "./FirebaseConfig";

export default function Login ({ navigation }){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pwHidden, setPwHidden] = useState(true);
	return (
		<View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
			<Text style={{ fontSize: 24, marginLeft: 30 }}>
				{" "}Login in your account
			</Text>
			<View
				style={{
					width: windowWidth - 60,
					height: 45,
					marginTop: 20,
					marginLeft: 30,
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: "white"
				}}
			>
				<Image
					source={require("../assets/Icon/mail.png")}
					resizeMode="stretch"
					style={{ width: 30, height: 30, marginLeft: 10 }}
				/>
				<TextInput
					style={{ height: "100%", flex: 1, marginLeft: 10, fontSize: 16 }}
					autoCapitalize={"none"}
					placeholder="E-mail"
				/>
			</View>
			<View
				style={{
					width: windowWidth - 60,
					height: 45,
					marginTop: 20,
					marginLeft: 30,
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: "white"
				}}
			>
				<Image
					source={require("../assets/Icon/lock.png")}
					resizeMode="stretch"
					style={{ width: 25, height: 25, marginLeft: 15 }}
				/>
				<TextInput
					style={{ height: "100%", flex: 1, marginLeft: 10, fontSize: 16 }}
					autoCapitalize={"none"}
					placeholder="Password"
					secureTextEntry={pwHidden ? true : false}
				/>
				<TouchableOpacity
					style={{
						height: "100%",
						aspectRatio: 1,
						justifyContent: "center",
						alignItems: "center"
					}}
					onPress={() => setPwHidden(!pwHidden)}
				>
					<Image
						source={require("../assets/Icon/show.png")}
						resizeMode="stretch"
						style={{ width: 25, height: 25 }}
					/>
				</TouchableOpacity>
			</View>
			<View
				style={{
					width: windowWidth - 60,
					marginTop: 30,
					marginLeft: 30,
					flexDirection: "row",
					alignItems: "center"
				}}
			>
				<TouchableOpacity>
					<Text style={{ color: "#707070", position: "absolute", right: 0 }}>
						Forgot password ?
					</Text>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity
					style={{
						height: 50,
						width: "40%",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#229E5C",
						marginLeft: 120,
						marginTop: 50,
						borderRadius: 100
					}}
					onPress={() => navigation.navigate("Home")}
				>
					<Text style={{ color: "white", fontSize: 16 }}>Login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
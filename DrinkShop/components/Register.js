import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { FirebaseApp } from "./FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const windowWidth = Dimensions.get("window").width;
export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwHidden, setPwHidden] = useState(true);
  const [pwConfirm, setPwConfirm] = useState("");
  const handleRegister = () => {
    const auth = getAuth(FirebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Successfully registered!", "Welcome to Drink Shop!", [
          { text: "Ok", onPress: () => navigation.navigate("Home") },
        ]);
        setEmail("");
        setPassword("");
        setPwConfirm("");
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        Alert.alert(
          `Failed to register!`,
          `Error: ${errorCode}`,
          [{ text: "Ok" }]
        );
      });
  };
  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "center", position:"relative" }}>
      <Text style={{ fontSize: 24, marginLeft: 30 }}>
        {" "}
        Create your account!
      </Text>
      <View
        style={{
          width: windowWidth - 60,
          height: 45,
          marginTop: 20,
          marginLeft: 30,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
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
          onChangeText={(text) => setEmail(text)}
          value={email}
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
          backgroundColor: "white",
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
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity
          style={{
            height: "100%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
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
          height: 45,
          marginTop: 20,
          marginLeft: 30,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TextInput
          style={{ height: "100%", flex: 1, marginLeft: 30, fontSize: 16 }}
          autoCapitalize={"none"}
          placeholder="Confirm"
          secureTextEntry={true}
          onChangeText={(text) => setPwConfirm(text)}
          value={pwConfirm}
        />
        <Image
          source={require("../assets/Icon/confirm.png")}
          resizeMode="stretch"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
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
            borderRadius: 100,
          }}
          onPress={() => {
            if (pwConfirm !== password) {
              Alert.alert("Failed to register!", "Passwords do not match!", [
                { text: "Ok" },
              ]);
            } else {
              handleRegister();
            }
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

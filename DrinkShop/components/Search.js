import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
export default function Search({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: "100%", height: "25%" }}>
                <TouchableOpacity
                style={{
                    height: "100%",
                    aspectRatio: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 340,
                }}
                onPress={() => navigation.openDrawer()}
                >
                <Image
                    source={require("../assets/Icon/menu.png")}
                    resizeMode="stretch"
                    style={{ width: 50, height: 50 }}
                />
                </TouchableOpacity>
            </View>
            <View
                style={{
                width: "100%",
                height: "40%",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 33, color: "#229E5C", fontStyle: "italic" }}>
                {" "}
                Choose the Drink
                </Text>
                <Text style={{ fontSize: 33, color: "#229E5C", fontStyle: "italic" }}>
                {" "}
                You Love!
                </Text>
            </View>
            <View
                style={{
                width: windowWidth - 60,
                height: 45,
                marginLeft: 30,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F1E2E2",
                borderRadius: 100,
                marginTop: 10,
                }}
            >
                <TextInput
                style={{
                    height: "100%",
                    flex: 1,
                    marginLeft: 35,
                    fontSize: 16,
                    fontStyle: "italic",
                }}
                autoCapitalize={"none"}
                placeholder="Search..."
                />
                <TouchableOpacity
                style={{
                    height: "100%",
                    aspectRatio: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 15,
                }}
                >
                <Image
                    source={require("../assets/Icon/find.png")}
                    resizeMode="stretch"
                    style={{ width: 30, height: 30 }}
                />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: "#ffffff",
        height: 90,
        marginVertical: 6,
        marginHorizontal: 20,
        borderRadius: 25,
    },
    title: {
        fontSize: 24,
        marginLeft: 30,
        color: "#229E5C",
        fontWeight: "bold",
        marginTop: 20,
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
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    checkbox: {
        margin: 8,
    },
    });
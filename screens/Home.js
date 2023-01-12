import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  VirtualizedList,
  SafeAreaView,
  StatusBar,
  ScrollView
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
const DATA = [
  {
    name: "Hot Coffee",
    img : require("../assets/Drink/coffee.png"),
  },
  {
    name: "Milk Tea",
    img : require("../assets/Drink/milkTea.png"),
  },
  {
    name: "Cocktail",
    img : require("../assets/Drink/cocktail.png"),
  },
  {
    name: "Instant Coffee",
    img : require("../assets/Drink/instantCoffee.png"),
  },
  {
    name: "Juice",
    img : require("../assets/Drink/juice.png"),
  },
];
const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `${data[index]['name']}`,
  img: data[index]['img'],
});
const getItemCount = (data) => 5;
const Item = ( {title, img} ) => (
  <View style={styles.item}>
    <View
      style={{
        width: "100%",
        height: "60%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Image
        source={img}
        resizeMode="stretch"
        style={{ width: 55, height: 55, marginTop: 4, marginRight: 20 }}
      />
    </View>
    <View
      style={{
        width: "100%",
        height: "40%",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 1,
          width: "70%",
          borderWidth: 1,
          marginLeft: 29,
          borderColor: "#707070",
        }}
      ></View>
      <TouchableOpacity
        style={{
          width: 50,
          height: 24,
          aspectRatio: 2,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
          backgroundColor: "#229E5C",
          borderRadius: 100,
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 14, fontStyle: "italic" }}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#E9E6E6" }}
      >
        <View style={{ width: "100%", height: "30%" }}>
          <Part1 navigation={navigation} />
        </View>
        <View style={{ width: "100%", height: "4%" }}>
          <Text
            style={{
              fontSize: 25,
              fontStyle: "italic",
              color: "#229E5C",
              marginLeft: 30,
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
              borderColor: "#707070",
            }}
          ></View>
        </View>
        <View style={{ width: "100%", height: "66%", marginTop: 10 }}>
          <Part2 />
        </View>
      </View>
    </SafeAreaView>
  );
};
const Part1 = ({ navigation }) => {
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
          autoCapitalize={false}
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

const Part2 = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%", height: "100%" }}>
        <VirtualizedList
          data={DATA}
          initialNumToRender={4}
          renderItem={({ item }) => <Item title={item.title} img={item.img} />}
          keyExtractor={(item) => item.key}
          getItemCount={getItemCount}
          getItem={getItem}
        />
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
});

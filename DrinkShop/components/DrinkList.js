import React from "react";
import {
    View,
    VirtualizedList,
    StyleSheet,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
function getItem(data, index) {
    return ({
        id: data[index]["id"],
        title: `${data[index]["name"]}`,
        img: data[index]["img"],
        index: index,
        checked: data[index]["isChecked"],
        price: data[index]["price"],
    });
}
function getItemCount(data) {
    return 5;
}
function Item({title, img, id, modalVisible, setModalVisible, index, setInd, checked, price}) {
    return (
        <View style={styles.item} key={id}>
            <View
                style={{
                    width: "100%",
                    height: "60%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Text style={styles.title}>{title}</Text>
                <Image
                    source={img}
                    resizeMode="stretch"
                    style={{ width: 55, height: 55, marginTop: 4, marginRight: 18 }} />
            </View>
            <View
                style={{
                    width: "100%",
                    height: "40%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ color: "black", fontSize: 20, fontStyle: "italic", marginLeft: 30 }}>{price} VND</Text>
                {checked === true ?
                    <Edit
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                        setInd={setInd}
                        index={index}
                    />
                    :
                    <Add
                        modalVisible={modalVisible}
                        index={index}
                        setModalVisible={setModalVisible}
                        setInd={setInd}
                    />
                }
            </View>
        </View>
    );
}
export default function DrinkList({ drinks ,modalVisible, setModalVisible, setInd }) {
    const renderDrinkList = (drinks) => {
        return (
        <View style={{ flex: 1 }}>
            <View style={{ width: "100%", height: "100%" }}>
                <VirtualizedList
                    data={drinks}
                    initialNumToRender={4}
                    renderItem={({ item }) => (
                        <Item
                            title={item.title}
                            img={item.img}
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            index={item.index}
                            setInd={setInd}
                            checked={item.checked}
                            price={item.price}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </View>
        </View>
    );
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: "100%", height: "100%" }}>
                {renderDrinkList(drinks)}
            </View>
        </View>
    );
};
const Add = ({modalVisible, index, setModalVisible,setInd}) => {
    return (
        <TouchableOpacity
            style={{
                width: 50,
                height: 24,
                aspectRatio: 2,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
                backgroundColor: "#229E5C",
                borderRadius: 100,
            }}
            onPress={() => {
                setModalVisible(!modalVisible);
                setInd(index);
            }}
        >
            <Text style={{ color: "#ffffff", fontSize: 14, fontStyle: "italic" }}>
                Add
            </Text>
        </TouchableOpacity>
    );
};
const Edit = ({setModalVisible, modalVisible, setInd, index}) => {
    return (
        <TouchableOpacity
            style={{
                width: 50,
                height: 24,
                aspectRatio: 2,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
                backgroundColor: "red",
                borderRadius: 100,
            }}
            onPress={() => {
                setModalVisible(!modalVisible);
                setInd(index);
            }}
        >
            <Text style={{ color: "#ffffff", fontSize: 14, fontStyle: "italic" }}>
                Edit
            </Text>
        </TouchableOpacity>
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
        flexWrap: "wrap",
        // justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        marginLeft: 30,
        color: "#229E5C",
        fontWeight: "bold",
        marginTop: 10,
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
import React from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from "react-native";
export default Profile = ({navigation}) => {
    return(
        <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight }}>
            <View style={{width: '100%', height:'100%', backgroundColor: '#E0DCDC'}}>
                <View style={{width: '100%', height:'30%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/Icon/avatar.png')} resizeMode = "stretch" style={{width: 164, height: 164, marginTop: 7}} />
                </View>
                <View style={{width: '100%', height: '56%'}}>
                    <View style={{width: 368, height: 70, backgroundColor: "white", marginLeft: 22, marginTop: 20, borderRadius:15}}>
                        <Text style={{fontSize:14, color: "#A19595", marginLeft: 10, marginTop:4 }}>Full Name</Text>
                        <TextInput style={{height:30, fontSize: 24, marginLeft: 10}} />
                        <View style={{height:1, width: 350, backgroundColor: '#342A2A', marginLeft: 10, bottom: 0}}></View>
                    </View>
                    <View style={{width: 368, height: 70, backgroundColor: "white", marginLeft: 22, marginTop: 18, borderRadius:15}}>
                        <Text style={{fontSize:14, color: "#A19595", marginLeft: 10, marginTop:4 }}>Phone's number</Text>
                        <TextInput style={{height:30, fontSize: 24, marginLeft: 10}} />
                        <View style={{height:1, width: 350, backgroundColor: '#342A2A', marginLeft: 10, bottom: 0}}></View>
                    </View>
                    <View style={{width: 368, height: 70, backgroundColor: "white", marginLeft: 22, marginTop: 18, borderRadius:15}}>
                        <Text style={{fontSize:14, color: "#A19595", marginLeft: 10, marginTop:4 }}>Email</Text>
                        <TextInput style={{height:30, fontSize: 24, marginLeft: 10}} />
                        <View style={{height:1, width: 350, backgroundColor: '#342A2A', marginLeft: 10, bottom: 0}}></View>
                    </View>
                    <View style={{width: 368, height: 70, backgroundColor: "white", marginLeft: 22, marginTop: 18, borderRadius:15}}>
                        <Text style={{fontSize:14, color: "#A19595", marginLeft: 10, marginTop:4 }}>Date of birth</Text>
                        <TextInput style={{height:30, fontSize: 24, marginLeft: 10}} />
                        <View style={{height:1, width: 350, backgroundColor: '#342A2A', marginLeft: 10, bottom: 0}}></View>
                    </View>
                    <View style={{width: 368, height: 70, backgroundColor: "white", marginLeft: 22, marginTop: 18, borderRadius:15}}>
                        <Text style={{fontSize:14, color: "#A19595", marginLeft: 10, marginTop:4 }}>Address</Text>
                        <TextInput style={{height:30, fontSize: 24, marginLeft: 10}} />
                        <View style={{height:1, width: 350, backgroundColor: '#342A2A', marginLeft: 10, bottom: 0}}></View>
                    </View>
                </View>
                <View style={{width: '100%', height: '14%', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 238, height: 55, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#A4ACA4'}}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
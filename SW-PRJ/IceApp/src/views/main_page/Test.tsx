/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};
const _spacing = 10;
const Test = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('./component/products/how-to-prepare-Nigerian-fried-rice.png')} resizeMode='cover' style={styles.header}>

        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeader: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
  },
  header: {
    width: '100%',
    height: 467,
  },
});

export default Test;

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, Pressable, Image, StyleSheet, View} from 'react-native';

const DeadTag = ({dead}) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.h1}>{dead}</Text>
    </View>
  );
};

const Section = ({title, point, rate, price, dead, url}) => {
  const secondLine = `${point} (${rate} ratings) - Start at $${price}`;

  return (
    <Pressable style={styles.container}>
      <View style={styles.imgDisplay}>
        <Image source={url} style={styles.img} />
      </View>
      <View style={styles.line}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.line}>
            <Image source={require('./products/Star1.png')} />
            <Text>{secondLine}</Text>
          </View>
        </View>
        {dead && <DeadTag dead={dead} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 250,
    marginTop: 20,
  },
  imgDisplay: {
    width: '100%',
    height: 200,
  },
  line: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  tag: {
    width: 88,
    height: 33,
    borderRadius: 10,
    backgroundColor: '#EF5B5B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  img: {flex: 1, borderRadius: 26},
});

export default Section;

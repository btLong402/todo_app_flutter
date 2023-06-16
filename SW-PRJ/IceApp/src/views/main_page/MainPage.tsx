/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Section from './component/pages/Section';
import {DataSection, Item} from './component/pages/DataModal';
import Page from './component/pages/PageLayout';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Divider} from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Data: DataSection[] = [
  {
    title: 'Popular',
    data: [
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
    ],
  },
  {
    title: 'Ice-cream & Tea',
    data: [
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
    ],
  },
  {
    title: 'Ice-cream',
    data: [
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
    ],
  },
  {
    title: 'Fruit tea',
    data: [
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
    ],
  },
  {
    title: 'Cheese tea & Pure tea',
    data: [
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
    ],
  },
  {
    title: 'Smoothies',
    data: [
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
      {
        title: 'Full Cup Passion Fruit',
        price: 40000,
        thumbnail: require('./component/products/sumptous1.png'),
      },
    ],
  },
];

const RenderItem = (props: Item) => {
  const {title, price, thumbnail} = props;
  return (
    <Pressable style={styles.item}>
      <Image
        // src={'https://vietngon.vn/wp-content/uploads/2023/03/kem-tuoi-ngon.jpg'}
        style={styles.img}
        source={thumbnail}
      />
      <View style={styles.right}>
        <Text style={styles.h1}>{title}</Text>
        <Text style={styles.h2}>{price}</Text>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="plus-circle" color="red" size={30} />
        </View>
      </View>
    </Pressable>
  );
};

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};

const _spacing = 10;
function MainPage() {
  const ref = useRef<FlatList>(null);
  const ref1 = useRef<FlatList>(null);
  const [i, setI] = useState(0);
  useEffect(() => {
    ref.current?.scrollToIndex({
      index: i,
      animated: true,
      viewPosition: 0,
    });
    ref1.current?.scrollToIndex({
      index: i,
      animated: true,
      viewPosition: 0,
    });
  }, [i]);
  return (
    <Page>
      <FlatList
        ref={ref}
        initialScrollIndex={i}
        style={{flexGrow: 0}}
        data={Data}
        keyExtractor={(item: DataSection, index: number) => item.title + index}
        contentContainerStyle={{paddingLeft: _spacing}}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index: fIndex}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setI(fIndex);
              }}>
              <View
                style={{
                  marginRight: _spacing,
                  padding: _spacing,
                  borderWidth: 2,
                  borderColor: _colors.active,
                  borderRadius: 12,
                  backgroundColor:
                    fIndex === i ? _colors.active : _colors.inactive,
                }}>
                <Text style={{color: '#36303F', fontWeight: '700'}}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
        ref={ref1}
        initialScrollIndex={i}
        data={Data}
        keyExtractor={(item: DataSection, index: number) => item.title + index}
        style={{flexGrow: 0}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Section title={item.title}>
              {item.data.map((p: Item, id: number) => (
                <RenderItem
                  title={p.title}
                  price={p.price}
                  thumbnail={p.thumbnail}
                  key={id}
                />
              ))}
              <Divider
                leadingInset={28}
                trailingInset={28}
                style={styles.divider}
              />
            </Section>
          );
        }}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 122,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  img: {
    width: 122,
    height: '100%',
    borderRadius: 14,
  },
  h1: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 20,
    color: 'black',
  },
  h2: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: 'black',
  },
  right: {
    padding: 5,
  },
  icon: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  divider: {
    height: 4,
    borderRadius: 4,
  },
});
export default MainPage;

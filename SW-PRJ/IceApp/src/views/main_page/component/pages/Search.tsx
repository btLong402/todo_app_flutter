/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View, TextInput} from 'react-native';

type Item = {
  productId: number;
  name: string;
  thumbnail: string;
};


export default function Search({navigation} : any) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<Item[]>([]);
  useEffect(() => {
    const filterData = () => {
      if (searchInput) {
        const filteredItems = data.filter(item => {
          const itemName = item.name ? item.name.toUpperCase() : '';
          const textInput = searchInput.toUpperCase();
          return itemName.includes(textInput);
        });
        setFilter(filteredItems);
      } else {
        setFilter(data);
      }
    };

    const timeoutId = setTimeout(filterData, 300);

    return () => clearTimeout(timeoutId);
  }, [data, searchInput]);

  return (
    <View>
      <Text>1</Text>
    </View>
  );
}

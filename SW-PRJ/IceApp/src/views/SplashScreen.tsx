/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Product, addNewProduct} from '../redux/product/productSlice';
import {addNewSize} from '../redux/size/sizeSlice';
import {addNewTopping} from '../redux/topping/toppingSlice';
import {addNewCategory} from '../redux/category/categorySlice';
import {
  getAllProducts,
  getAllCategory,
  getAllTopping,
  getAllSize,
} from '../services/product-api';
import {useAppDispatch} from '../redux/hook';
const Splash = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [isDisable, setDisable] = React.useState<boolean>(true);
  const loadData = async () => {
    await getAllProducts().then((result: any) => {
      result.data.forEach((product: any) => {
        let toppingList: any = [];
        let category: any = [];
        let size: any = [];
        product.toppingList.forEach((topping: any) => {
          toppingList.push({toppingId: String(topping.toppingId)});
        });
        product.category.forEach((cate: any) => {
          category.push({
            title: String(cate.title),
          });
        });
        product.sizeList.forEach((s: any) => {
          size.push({
            sizeId: String(s._id),
          });
        });
        let newProduct: Product = {
          productId: String(product._id),
          name: String(product.name),
          description: '',
          basePrice: Number(product.basePrice),
          discount: 0,
          category: category,
          sizeList: size,
          toppingList: toppingList,
          image: String(product.image),
        };
        dispatch(addNewProduct(newProduct));
      });
    });
    await getAllCategory().then((result: any) => {
      result.data.forEach((category: any) => {
        dispatch(
          addNewCategory({
            title: String(category.title),
            categoryId: String(category._id),
          }),
        );
      });
    });
    await getAllSize().then(result => {
      result.data.forEach((size: any) => {
        dispatch(
          addNewSize({
            size: String(size.size),
            sizeId: String(size._id),
            price: Number(size.price),
          }),
        );
      });
    });
    await getAllTopping().then(result => {
      result.data.forEach((topping: any) => {
        dispatch(
          addNewTopping({
            toppingId: String(topping._id),
            name: String(topping.name),
            price: Number(topping.price),
          }),
        );
      });
    });
  };
  useEffect(() => {
    loadData();
    setTimeout(() => {
      setDisable(false);
    }, 3000);
  }, []);
  const handleClick = () => {
    navigation.navigate('MyTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.img}
          source={require('../components/images/logo.png')}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.h1}>Welcome to Mixue HUST</Text>
        <Text style={styles.h2}>Order the best meals in Vietnam and</Text>
        <Text style={styles.h2}>have them delivered to your doorstep</Text>
        <Text style={styles.h2}>in little or no time.</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={handleClick}
          disabled={isDisable}>
          {isDisable ? (
            <ActivityIndicator size="large" />
          ) : (
            <Image source={require('../components/images/Vector.png')} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
  },
  logo: {
    alignItems: 'center',
  },
  img: {
    width: 355,
    height: 332,
  },
  body: {
    alignItems: 'center',
  },
  h1: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 35,
    color: 'white',
    marginTop: 150,
  },
  h2: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  btn: {
    width: 227,
    height: 47,
    borderRadius: 34,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;

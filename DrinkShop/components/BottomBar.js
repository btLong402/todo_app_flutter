import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, Animated, PanResponder} from 'react-native';

const BottomBar = () => {
  const [isShown, setIsShown] = useState(false);
  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        setIsShown(true);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.timing(bottomValue, {
            toValue: -100,
            duration: 100,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(bottomValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -150) {
          setIsShown(false);
        } else {
          setIsShown(true);
          Animated.timing(bottomValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  );
  const bottomValue = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {isShown && (
        <Animated.View
          style={[styles.bottomBar, {transform: [{translateY: bottomValue}]}]}
          {...panResponder.panHandlers}>
          <Text style={styles.text}>Bottom Bar</Text>
        </Animated.View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 20,
  },
});
export default BottomBar;
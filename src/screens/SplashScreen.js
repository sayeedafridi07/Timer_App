import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {lightColors} from '../theme/colors';
import {HP} from '../theme/scale';
import {ScreenNames} from '../data/ScreenNames';
import clock from '../assets/clock.png';

const SplashScreen = ({}) => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(
      () => (ring1Padding.value = withSpring(HP(5))),
      100,
    );
    setTimeout(
      () => (ring2Padding.value = withSpring(HP(5.5))),
      300,
    );
  }, []);

  const ring1Style = useAnimatedStyle(() => {
    return {
      padding: ring1Padding.value,
    };
  });

  const ring2Style = useAnimatedStyle(() => {
    return {
      padding: ring2Padding.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={lightColors.disclaimer2}
      />
      <Animated.View style={[styles.ring, ring1Style]}>
        <Animated.View style={[styles.ring, ring2Style]}>
          <Image source={clock} style={styles.image} />
        </Animated.View>
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.subtitle}>Track time, stay on rhythm!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.disclaimer2,
  },
  ring: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 9999,
  },
  image: {
    width: HP(20),
    height: HP(20),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: HP(7),
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: HP(2),
    fontWeight: '500',
    color: 'white',
    letterSpacing: 2,
  },
});

export default SplashScreen;

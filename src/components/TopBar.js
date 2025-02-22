import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {fontSize, HP, WP} from '../theme/scale';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Animated, {RollInLeft, ZoomIn, ZoomOut} from 'react-native-reanimated';
import {useTheme} from '../theme/ThemeProvider';

const TopBar = ({title, rightView}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Animated.View
        entering={RollInLeft.delay(100).duration(700).springify().damping(12)}>
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <ChevronLeftIcon color={colors.white} size={HP(3)} strokeWidth={2} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.Text
        entering={ZoomIn.delay(100).duration(700).springify().damping(12)}
        style={styles.titleTxt}>
        {title}
      </Animated.Text>
      {rightView || <View style={styles.emptyView} />}
    </View>
  );
};

export default TopBar;

const createStyles = colors =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: HP(2),
      paddingHorizontal: WP(5),
    },
    backBtn: {
      backgroundColor: colors.black,
      padding: WP(3),
      borderRadius: 99,
    },
    titleTxt: {
      fontSize: fontSize(20),
      color: colors.black,
      fontWeight: '600',
      flex: 1,
      textAlign: 'center',
    },
    emptyView: {
      width: WP(10),
    },
  });

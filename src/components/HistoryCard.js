import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {fontSize, HP, WP} from '../theme/scale';
import {CheckCircleIcon, ClockIcon} from 'react-native-heroicons/outline';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useTheme} from '../theme/ThemeProvider';

const HistoryCard = ({data, index}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  const formatDate = timestamp => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200)
        .duration(700)
        .springify()
        .damping(12)}
      style={styles.container}>
      <Text style={styles.name}>{data?.name}</Text>
      <Text style={styles.catergoryBadge}>{data?.category}</Text>
      <View style={styles.border} />
      <View style={styles.detailsContainer}>
        <ClockIcon size={HP(2)} color={colors.black} />
        <Text style={styles.details}>{formatDuration(data?.duration)}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <CheckCircleIcon size={HP(2)} color={colors.black} />
        <Text style={styles.details}>{formatDate(data?.completedAt)}</Text>
      </View>
    </Animated.View>
  );
};

export default HistoryCard;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      padding: WP(4),
      marginVertical: HP(1),
      borderRadius: WP(3),
      backgroundColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    name: {
      fontSize: fontSize(16),
      color: colors.black,
      fontWeight: '600',
    },
    catergoryBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      fontSize: fontSize(12),
      color: colors.white,
      backgroundColor: colors.black,
      paddingHorizontal: HP(2),
      paddingVertical: WP(2),
      borderTopRightRadius: WP(3),
      borderBottomLeftRadius: WP(3),
    },
    border: {
      borderBottomWidth: 0.5,
      borderColor: colors.black,
      marginVertical: HP(1),
    },
    detailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: WP(1),
    },
    details: {
      fontSize: fontSize(12),
      color: colors.black,
      fontWeight: '600',
    },
  });

// TimerCard.jsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowPathIcon,
  PauseIcon,
  PlayIcon,
} from 'react-native-heroicons/outline';
import {fontSize, HP, WP} from '../theme/scale';
import useTimerStore from '../store/useTimerStore';
import {useTheme} from '../theme/ThemeProvider';

const TimerCard = ({timer}) => {
  const {colors} = useTheme();
  const {startTimer, pauseTimer, resetTimer} = useTimerStore();

  const styles = createStyles(colors);

  const progress = (timer.remainingTime / timer.duration) * 100;
  const minutes = Math.floor(timer.remainingTime / 60);
  const seconds = timer.remainingTime % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{timer?.name}</Text>
      <Text style={styles.statusBadge}>{timer?.status}</Text>

      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>

      <View style={styles.controls}>
        {timer.status === 'running' ? (
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => pauseTimer(timer.id)}>
            <PauseIcon size={HP(3)} color={colors.black} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => startTimer(timer.id)}>
            <PlayIcon size={HP(3)} color={colors.black} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => resetTimer(timer.id)}>
          <ArrowPathIcon size={HP(3)} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerCard;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      padding: WP(4),
      marginBottom: HP(2),
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
    statusBadge: {
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
    timeContainer: {
      alignItems: 'center',
      marginVertical: HP(1.5),
    },
    time: {
      fontSize: fontSize(40),
      color: colors.black,
      fontWeight: '700',
    },
    progressBarContainer: {
      height: HP(1),
      backgroundColor: colors.disabled,
      borderRadius: 999,
      marginVertical: HP(1),
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: colors.black,
      borderRadius: 999,
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: WP(8),
      marginTop: HP(1.5),
    },
  });

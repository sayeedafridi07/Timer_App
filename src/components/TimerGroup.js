import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import TimerCard from './TimerCard';
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from 'react-native-heroicons/outline';
import {fontSize, HP, WP} from '../theme/scale';
import Animated, {FadeInDown} from 'react-native-reanimated';
import useTimerStore from '../store/useTimerStore';
import {useTheme} from '../theme/ThemeProvider';

const TimerGroup = ({group, index}) => {
  const {colors} = useTheme();
  const {
    toggleCategory,
    startAllInCategory,
    pauseAllInCategory,
    resetAllInCategory,
  } = useTimerStore();

  const styles = createStyles(colors);

  const handleToggleCategory = () => {
    toggleCategory(group.category);
  };

  const handleStartAll = () => {
    startAllInCategory(group.category);
  };

  const handlePauseAll = () => {
    pauseAllInCategory(group.category);
  };

  const handleResetAll = () => {
    resetAllInCategory(group.category);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200)
        .duration(700)
        .springify()
        .damping(12)}
      style={styles.container}>
      <Pressable style={styles.header} onPress={handleToggleCategory}>
        <View style={styles.titleContainer}>
          {group.isExpanded ? (
            <ChevronDownIcon size={HP(3)} color={colors.black} />
          ) : (
            <ChevronRightIcon size={HP(3)} color={colors.black} />
          )}
          <Text style={styles.title}>{group.category}</Text>
          <Text style={styles.count}>({group?.timers?.length})</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.actionButton}
            onPress={handleStartAll}>
            <PlayIcon size={HP(3)} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.actionButton}
            onPress={handlePauseAll}>
            <PauseIcon size={HP(3)} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.actionButton}
            onPress={handleResetAll}>
            <ArrowPathIcon size={HP(3)} color={colors.white} />
          </TouchableOpacity>
        </View>
      </Pressable>

      {group.isExpanded && (
        <View style={styles.timers}>
          {group.timers.map(timer => (
            <TimerCard key={timer.id} timer={timer} />
          ))}
        </View>
      )}
    </Animated.View>
  );
};

export default TimerGroup;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      borderRadius: WP(3),
      marginVertical: HP(1),
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: WP(4),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: WP(2),
    },
    title: {
      fontSize: fontSize(16),
      color: colors.black,
      fontWeight: '600',
    },
    count: {
      fontSize: fontSize(16),
      color: colors.disclaimer3,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: WP(3),
    },
    actionButton: {
      padding: WP(1),
      backgroundColor: colors.black,
      borderRadius: 100,
    },
    timers: {
      padding: HP(2),
    },
  });

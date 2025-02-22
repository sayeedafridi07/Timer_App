import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontSize, HP, WP} from '../theme/scale';
import {
  AdjustmentsHorizontalIcon,
  ClockIcon,
  PlusIcon,
  MoonIcon,
  SunIcon,
} from 'react-native-heroicons/outline';
import TimerGroup from '../components/TimerGroup';
import {ScreenNames} from '../data/ScreenNames';
import useTimerStore from '../store/useTimerStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompletionModal from '../components/CompletionModal';
import Animated, {BounceIn, FadeInLeft} from 'react-native-reanimated';
import FilterBottomSheet from '../components/FilterBottomSheet';
import HalfwayModal from '../components/HalfwayModal';
import {useTheme} from '../theme/ThemeProvider';
import noTimerFound from '../assets/noTimerFound.png';

const HomeScreen = ({navigation}) => {
  const {colors, isDark, toggleTheme} = useTheme();
  const {timers, categories} = useTimerStore();
  const [completedTimer, setCompletedTimer] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [halfwayTimer, setHalfwayTimer] = useState(null);

  const styles = createStyles(colors);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning!';
    } else if (hour < 18) {
      return 'Good Afternoon!';
    } else {
      return 'Good Evening!';
    }
  };

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedTimers = await AsyncStorage.getItem('timers');
        const storedHistory = await AsyncStorage.getItem('history');

        if (storedTimers) {
          useTimerStore.setState({timers: JSON.parse(storedTimers)});
        }
        if (storedHistory) {
          useTimerStore.setState({history: JSON.parse(storedHistory)});
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const checkCompletedTimer = () => {
      const justCompleted = timers.find(
        timer =>
          timer.status === 'completed' &&
          timer.completedAt &&
          Date.now() - timer.completedAt < 1000,
      );

      if (justCompleted) {
        setCompletedTimer(justCompleted);
      }
    };

    checkCompletedTimer();
  }, [timers]);

  useEffect(() => {
    const checkHalfwayAlert = () => {
      const halfwayAlertTimer = timers.find(
        timer => timer.halfwayAlert && timer.halfwayAlertTriggered,
      );

      if (halfwayAlertTimer) {
        setHalfwayTimer(halfwayAlertTimer);
        useTimerStore.setState(state => ({
          timers: state.timers.map(t =>
            t.id === halfwayAlertTimer.id
              ? {...t, halfwayAlertTriggered: false, halfwayAlert: false}
              : t,
          ),
        }));
      }
    };

    checkHalfwayAlert();
  }, [timers]);

  const filteredTimers = selectedCategory
    ? timers.filter(timer => timer.category === selectedCategory)
    : timers;

  const timerGroups = Object.entries(
    filteredTimers.reduce((groups, timer) => {
      const category = timer.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(timer);
      return groups;
    }, {}),
  ).map(([category, timers]) => ({
    category,
    timers,
    isExpanded: categories[category] === true,
  }));

  const handleFilter = category => {
    setSelectedCategory(category);
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    setSelectedCategory(null);
    setShowFilter(false);
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image source={noTimerFound} style={styles.emptyImage} />
      <Text style={styles.emptyText}>
        No timers found,{'\n'}please add one.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />
      <View style={styles.header}>
        <Animated.Text
          entering={FadeInLeft.duration(700).springify().damping(12)}
          style={styles.greetingTxt}>
          {getGreeting()}
        </Animated.Text>
        <Animated.View
          entering={BounceIn.delay(100).duration(700).springify().damping(12)}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.HISTORY_SCREEN)}>
            <ClockIcon size={HP(4)} color={colors.black} strokeWidth={1} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={BounceIn.delay(150).duration(700).springify().damping(12)}>
          <TouchableOpacity onPress={toggleTheme}>
            {isDark ? (
              <SunIcon size={HP(4)} color={colors.black} strokeWidth={1} />
            ) : (
              <MoonIcon size={HP(4)} color={colors.black} strokeWidth={1} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.header}>
        <Text style={styles.titleTxt}>Your Timers</Text>
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <AdjustmentsHorizontalIcon
            size={HP(3.5)}
            color={colors.black}
            strokeWidth={1}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={timerGroups}
        renderItem={({item, index}) => (
          <TimerGroup group={item} index={index} />
        )}
        keyExtractor={item => item.category}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={false}
        ListEmptyComponent={ListEmptyComponent}
      />
      <TouchableOpacity
        style={styles.postPropertyBtn}
        onPress={() => navigation.navigate(ScreenNames.ADD_TIMER_SCREEN)}>
        <PlusIcon size={HP(4)} color={colors.white} />
      </TouchableOpacity>

      <FilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        selectedCategory={selectedCategory}
        onFilter={handleFilter}
        onReset={handleResetFilter}
      />

      <HalfwayModal
        timer={halfwayTimer}
        visible={!!halfwayTimer}
        onClose={() => setHalfwayTimer(null)}
      />

      <CompletionModal
        timer={completedTimer}
        visible={!!completedTimer}
        onClose={() => setCompletedTimer(null)}
      />
    </View>
  );
};

export default HomeScreen;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: HP(2),
      paddingHorizontal: WP(5),
    },
    greetingTxt: {
      fontSize: fontSize(30),
      fontWeight: 'bold',
      color: colors.black,
    },
    titleTxt: {
      fontSize: fontSize(16),
      fontWeight: '600',
      color: colors.black,
    },
    listContent: {
      marginHorizontal: WP(5),
      paddingBottom: HP(10),
    },
    postPropertyBtn: {
      position: 'absolute',
      bottom: HP(6),
      right: HP(2),
      backgroundColor: colors.black,
      height: HP(7),
      width: HP(7),
      borderRadius: HP(3.5),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: HP(10),
    },
    emptyImage: {
      width: WP(50),
      height: HP(25),
      resizeMode: 'contain',
    },
    emptyText: {
      marginTop: HP(2),
      fontSize: fontSize(18),
      color: colors.black,
      textAlign: 'center',
    },
  });

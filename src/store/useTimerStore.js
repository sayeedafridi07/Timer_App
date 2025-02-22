import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTimerStore = create((set, get) => {
  const intervalRefs = {};

  const setupTimerInterval = timerId => {
    if (intervalRefs[timerId]) {
      clearInterval(intervalRefs[timerId]);
    }

    intervalRefs[timerId] = setInterval(() => {
      get().tick(timerId);
    }, 1000);
  };

  const clearTimerInterval = timerId => {
    if (intervalRefs[timerId]) {
      clearInterval(intervalRefs[timerId]);
      delete intervalRefs[timerId];
    }
  };

  return {
    timers: [],
    history: [],
    categories: {},

    addTimer: timerData => {
      const timer = {
        id: Date.now().toString(),
        status: 'idle',
        remainingTime: timerData.duration,
        createdAt: Date.now(),
        ...timerData,
      };

      set(state => {
        const newTimers = [...state.timers, timer];
        AsyncStorage.setItem('timers', JSON.stringify(newTimers));
        return {timers: newTimers};
      });
    },

    updateTimer: (id, updates) => {
      set(state => {
        const newTimers = state.timers.map(timer =>
          timer.id === id ? {...timer, ...updates} : timer,
        );
        AsyncStorage.setItem('timers', JSON.stringify(newTimers));
        return {timers: newTimers};
      });
    },

    deleteTimer: id => {
      clearTimerInterval(id);

      set(state => {
        const newTimers = state.timers.filter(timer => timer.id !== id);
        AsyncStorage.setItem('timers', JSON.stringify(newTimers));
        return {timers: newTimers};
      });
    },

    startTimer: id => {
      setupTimerInterval(id);

      set(state => ({
        timers: state.timers.map(timer =>
          timer.id === id ? {...timer, status: 'running'} : timer,
        ),
      }));
    },

    pauseTimer: id => {
      clearTimerInterval(id);

      set(state => ({
        timers: state.timers.map(timer =>
          timer.id === id ? {...timer, status: 'paused'} : timer,
        ),
      }));
    },

    resetTimer: id => {
      clearTimerInterval(id);

      set(state => ({
        timers: state.timers.map(timer =>
          timer.id === id
            ? {
                ...timer,
                status: 'idle',
                remainingTime: timer.duration,
                halfwayAlertTriggered: false,
                halfwayAlert: timer.halfwayAlert,
              }
            : timer,
        ),
      }));
    },

    toggleCategory: category => {
      set(state => ({
        categories: {
          ...state.categories,
          [category]: !state.categories[category],
        },
      }));
    },

    startAllInCategory: category => {
      const timersToStart = get().timers.filter(
        timer =>
          timer.category === category &&
          timer.status !== 'completed' &&
          timer.status !== 'running',
      );

      timersToStart.forEach(timer => {
        setupTimerInterval(timer.id);
      });

      set(state => ({
        timers: state.timers.map(timer =>
          timer.category === category && timer.status !== 'completed'
            ? {...timer, status: 'running'}
            : timer,
        ),
      }));
    },

    pauseAllInCategory: category => {
      const timersToPause = get().timers.filter(
        timer => timer.category === category && timer.status === 'running',
      );

      timersToPause.forEach(timer => {
        clearTimerInterval(timer.id);
      });

      set(state => ({
        timers: state.timers.map(timer =>
          timer.category === category && timer.status === 'running'
            ? {...timer, status: 'paused'}
            : timer,
        ),
      }));
    },

    resetAllInCategory: category => {
      const timersToReset = get().timers.filter(
        timer => timer.category === category,
      );

      timersToReset.forEach(timer => {
        clearTimerInterval(timer.id);
      });

      set(state => ({
        timers: state.timers.map(timer =>
          timer.category === category
            ? {
                ...timer,
                status: 'idle',
                remainingTime: timer.duration,
                halfwayAlertTriggered: false,
              }
            : timer,
        ),
      }));
    },

    tick: id => {
      set(state => {
        const timer = state.timers.find(t => t.id === id);
        if (!timer || timer.status !== 'running') return state;

        const newRemainingTime = timer.remainingTime - 1;
        const halfwayPoint = timer.duration / 2;

        if (newRemainingTime <= 0) {
          clearTimerInterval(id);

          const history = {
            id: timer.id,
            name: timer.name,
            category: timer.category,
            duration: timer.duration,
            completedAt: Date.now(),
          };

          AsyncStorage.setItem(
            'history',
            JSON.stringify([...state.history, history]),
          );

          return {
            timers: state.timers.map(t =>
              t.id === id
                ? {
                    ...t,
                    status: 'completed',
                    remainingTime: 0,
                    completedAt: Date.now(),
                  }
                : t,
            ),
            history: [...state.history, history],
          };
        }

        const shouldTriggerHalfwayAlert =
          timer.halfwayAlert &&
          !timer.halfwayAlertTriggered &&
          newRemainingTime <= halfwayPoint;

        return {
          timers: state.timers.map(t =>
            t.id === id
              ? {
                  ...t,
                  remainingTime: newRemainingTime,
                  halfwayAlertTriggered: shouldTriggerHalfwayAlert
                    ? true
                    : t.halfwayAlertTriggered,
                }
              : t,
          ),
        };
      });
    },

    completeTimer: id => {
      clearTimerInterval(id);

      const timer = get().timers.find(t => t.id === id);
      if (!timer) return;

      const history = {
        id: timer.id,
        name: timer.name,
        category: timer.category,
        duration: timer.duration,
        completedAt: Date.now(),
      };

      set(state => {
        const newHistory = [...state.history, history];
        AsyncStorage.setItem('history', JSON.stringify(newHistory));
        return {
          timers: state.timers.map(t =>
            t.id === id
              ? {...t, status: 'completed', completedAt: Date.now()}
              : t,
          ),
          history: newHistory,
        };
      });
    },
  };
});

export default useTimerStore;

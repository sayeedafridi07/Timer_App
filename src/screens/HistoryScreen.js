import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import {fontSize, HP, WP} from '../theme/scale';
import {ArrowUpOnSquareIcon} from 'react-native-heroicons/outline';
import HistoryCard from '../components/HistoryCard';
import TopBar from '../components/TopBar';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import useTimerStore from '../store/useTimerStore';
import Animated, {RollInRight} from 'react-native-reanimated';
import {useTheme} from '../theme/ThemeProvider';
import noHistoryFound from '../assets/noHistoryFound.jpg';

const HistoryScreen = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const history = useTimerStore(state => state.history);

  const exportHistory = async () => {
    try {
      const jsonString = JSON.stringify(history, null, 2);
      const path = `${RNFS.DocumentDirectoryPath}/timer_history.json`;

      await RNFS.writeFile(path, jsonString, 'utf8');

      const options = {
        title: 'Share JSON File',
        url: `file://${path}`,
        type: 'application/json',
      };

      await Share.open(options);
    } catch (error) {
      Alert.alert('Error', 'Failed to export file');
      console.error(error);
    }
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image source={noHistoryFound} style={styles.emptyImage} />
      <Text style={styles.emptyText}>No history found!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopBar
        title="History"
        rightView={
          history.length > 0 && (
            <Animated.View
              entering={RollInRight.delay(100)
                .duration(700)
                .springify()
                .damping(12)}>
              <TouchableOpacity
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={exportHistory}>
                <ArrowUpOnSquareIcon color={colors.black} size={HP(4)} />
              </TouchableOpacity>
            </Animated.View>
          )
        }
      />
      <FlatList
        data={history}
        renderItem={({item, index}) => (
          <HistoryCard data={item} index={index} />
        )}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={false}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default HistoryScreen;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    listContent: {
      marginHorizontal: WP(5),
      paddingBottom: HP(10),
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

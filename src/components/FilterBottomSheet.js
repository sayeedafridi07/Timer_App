import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {fontSize, HP, ScreenWidth, WP} from '../theme/scale';
import colors from '../theme/colors';
import {Category} from '../data/Category';
import Animated, {FadeInDown, FadeInLeft} from 'react-native-reanimated';
import {XCircleIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../theme/ThemeProvider';

const FilterBottomSheet = ({
  visible,
  onClose,
  selectedCategory,
  onFilter,
  onReset,
}) => {
  const {colors} = useTheme();
  const [selectedCat, setSelectedCat] = useState(selectedCategory);

  const styles = createStyles(colors);

  const handleApply = () => {
    onFilter(selectedCat);
  };

  const handleReset = () => {
    setSelectedCat(null);
    onReset();
  };

  const handleClose = () => {
    if (selectedCat !== selectedCategory) {
      setSelectedCat(null);
    }
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.bottomSheet}>
        <View style={styles.flex}>
          <Animated.Text
            entering={FadeInLeft.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            style={styles.categoryLabel}>
            Filter by category
          </Animated.Text>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.closeIcon}
            onPress={handleClose}>
            <XCircleIcon size={HP(4)} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          {Category?.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 200)
                .duration(700)
                .springify()
                .damping(12)}>
              <TouchableOpacity
                onPress={() => setSelectedCat(item)}
                style={[
                  styles.categoryButton,
                  selectedCat === item && styles.categoryButtonSelected,
                ]}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCat === item && styles.categoryButtonTextSelected,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <Animated.View
          entering={FadeInDown.delay(200)
            .duration(700)
            .springify()
            .damping(12)}>
          <View style={styles.buttonContainer}>
            {selectedCat ? (
              <TouchableOpacity
                onPress={handleReset}
                style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleClose}
                style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Close</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterBottomSheet;

const createStyles = colors =>
  StyleSheet.create({
    backdrop: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.transparentBlack,
    },
    bottomSheet: {
      width: '100%',
      backgroundColor: colors.white,
      borderTopLeftRadius: WP(5),
      borderTopRightRadius: WP(5),
      paddingHorizontal: WP(4),
      paddingVertical: HP(2),
      // alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },
    categoryLabel: {
      fontSize: fontSize(20),
      fontWeight: '600',
      color: colors.black,
    },
    flex: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: HP(2),
    },
    categoryButton: {
      backgroundColor: colors.white,
      width: ScreenWidth / 3 - WP(5),
      paddingVertical: HP(2),
      borderRadius: WP(3),
      borderWidth: 1,
      borderColor: colors.black,
    },
    categoryButtonSelected: {
      backgroundColor: colors.dark,
    },
    categoryButtonText: {
      color: colors.black,
      textAlign: 'center',
    },
    categoryButtonTextSelected: {
      color: colors.white,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: WP(4),
      marginTop: HP(4),
    },
    resetButton: {
      flex: 1,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.black,
      paddingVertical: HP(1.5),
      alignItems: 'center',
      borderRadius: 99,
      marginRight: WP(2),
    },
    resetButtonText: {
      color: colors.black,
      fontSize: fontSize(14),
      fontWeight: '400',
    },
    applyButton: {
      flex: 1,
      backgroundColor: colors.black,
      borderWidth: 1,
      borderColor: colors.black,
      paddingVertical: HP(1.5),
      alignItems: 'center',
      borderRadius: 99,
      marginLeft: WP(2),
    },
    applyButtonText: {
      color: colors.white,
      fontSize: fontSize(14),
      fontWeight: '400',
    },
  });

import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal} from 'react-native';
import {fontSize, HP, WP} from '../theme/scale';
import {useTheme} from '../theme/ThemeProvider';

export default function CompletionModal({timer, visible, onClose}) {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  if (!timer) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.congratsText}>Congratulations! 🎉</Text>
          <Text style={styles.message}>Timer completed successfully!</Text>

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = colors =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.transparentBlack,
    },
    modalView: {
      margin: WP(5),
      width: WP(90),
      backgroundColor: colors.white,
      borderRadius: WP(5),
      paddingHorizontal: WP(4),
      paddingVertical: HP(4),
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    congratsText: {
      fontSize: fontSize(24),
      fontWeight: '600',
      color: colors.black,
    },
    timerName: {
      fontSize: fontSize(16),
      fontWeight: '600',
      color: colors.black,
      marginTop: HP(1),
    },
    message: {
      fontSize: fontSize(16),
      fontWeight: '600',
      color: colors.disclaimer3,
      marginTop: HP(1),
    },
    button: {
      backgroundColor: colors.black,
      paddingVertical: HP(2),
      alignItems: 'center',
      borderRadius: 99,
      marginTop: HP(2),
      width: WP(50),
      alignSelf: 'center',
    },
    buttonText: {
      color: colors.white,
      fontSize: fontSize(16),
      fontWeight: '600',
    },
  });

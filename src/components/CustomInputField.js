import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {fontSize, HP, WP} from '../theme/scale';
import {useTheme} from '../theme/ThemeProvider';

const CustomInputField = ({
  label,
  placeholder,
  indicatorText,
  maxLength,
  value,
  onChangeText,
  keyboardType = 'default',
  error,
  bgColor,
  isMandatory = false,
  showLength = false,
  borderColor,
  style,
}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.flex}>
          <Text style={styles.label}>
            {label}
            {isMandatory && <Text style={styles.mandatory}> *</Text>}
          </Text>
          {showLength && (
            <Text style={styles.counterTxt}>
              {value?.length}/{maxLength}
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          error && {borderColor: colors.red},
          isFocused && {borderColor: colors.blue},
        ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          maxLength={maxLength && maxLength}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          cursorColor={colors.black}
          placeholderTextColor={colors.inputFieldPlaceholder}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {indicatorText && (
          <Text style={styles.indicatorText}>{indicatorText}</Text>
        )}
      </View>
    </View>
  );
};

export default CustomInputField;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      marginBottom: HP(2),
    },
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: HP(1),
    },
    label: {
      fontSize: fontSize(14),
      fontWeight: '600',
      color: colors.black,
    },
    counterTxt: {
      fontSize: fontSize(12),
      color: colors.disclaimer2,
    },
    inputContainer: {
      backgroundColor: colors.white,
      borderColor: colors.black,
      borderWidth: 1.5,
      borderRadius: WP(3),
      height: HP(6),
      paddingHorizontal: WP(4),
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize: fontSize(14),
      color: colors.black,
    },
    indicatorText: {
      fontSize: fontSize(14),
      color: colors.disclaimer2,
      marginLeft: WP(2),
    },
    mandatory: {
      color: colors.errorBorder,
    },
  });

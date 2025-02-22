import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import TopBar from '../components/TopBar';
import CustomInputField from '../components/CustomInputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fontSize, HP, ScreenWidth, WP} from '../theme/scale';
import Animated, {BounceIn, FadeInDown} from 'react-native-reanimated';
import useTimerStore from '../store/useTimerStore';
import {Category} from '../data/Category';
import {useTheme} from '../theme/ThemeProvider';

const AddTimerScreen = ({navigation}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const addTimer = useTimerStore(state => state.addTimer);
  const [values, setValues] = useState({
    name: '',
    duration: '10',
    category: Category[0],
    halfwayAlert: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const validate = () => {
    let valid = true;
    let errors = {};
    if (!values.name || values.name.trim() === '') {
      valid = false;
    }
    if (!values.duration || isNaN(values.duration) || values.duration <= 0) {
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) {
      Alert.alert('Please fill all the fields correctly');
      return;
    }

    setIsSubmitting(true);
    addTimer({
      name: values.name,
      duration: parseInt(values.duration, 10),
      category: values.category,
      halfwayAlert: values.halfwayAlert,
    });

    navigation.goBack();
    setIsSubmitting(false);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.flex}
      contentContainerStyle={styles.flexGrow}
      extraScrollHeight={20}
      enableOnAndroid={true}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <TopBar title="Add Timer" />
      <View style={styles.container}>
        <Animated.View
          entering={FadeInDown.delay(100)
            .duration(700)
            .springify()
            .damping(12)}>
          <CustomInputField
            label="Timer Name"
            placeholder="Enter timer name..."
            value={values.name}
            onChangeText={text => handleChange('name', text)}
            error={errors.name}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200)
            .duration(700)
            .springify()
            .damping(12)}>
          <CustomInputField
            label="Duration"
            placeholder="Enter duration..."
            indicatorText="Seconds"
            value={values.duration}
            onChangeText={text => handleChange('duration', text)}
            error={errors.duration}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(300)
            .duration(700)
            .springify()
            .damping(12)}>
          <Text style={styles.categoryLabel}>Select Category :</Text>
          <View style={styles.categoryContainer}>
            {Category?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleChange('category', item)}
                style={[
                  styles.categoryButton,
                  values.category === item && styles.categoryButtonSelected,
                ]}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    values.category === item &&
                      styles.categoryButtonTextSelected,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
          style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Halfway Alert</Text>
          <Switch
            trackColor={{true: colors.dark, false: colors.disclaimer}}
            thumbColor={colors.offWhite}
            value={values.halfwayAlert}
            onValueChange={value => handleChange('halfwayAlert', value)}
          />
        </Animated.View>
        <Animated.View
          entering={BounceIn.delay(500).duration(700).springify().damping(12)}>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.submitButtonText}>Add</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddTimerScreen;

const createStyles = colors =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.white,
    },
    flexGrow: {
      flexGrow: 1,
    },
    container: {
      marginTop: HP(3),
      marginHorizontal: WP(5),
      backgroundColor: colors.white,
    },
    categoryLabel: {
      fontSize: fontSize(14),
      fontWeight: '600',
      color: colors.black,
    },
    categoryContainer: {
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
      borderWidth: 2,
      borderColor: colors.black,
    },
    categoryButtonSelected: {
      backgroundColor: colors.black,
    },
    categoryButtonText: {
      color: colors.black,
      textAlign: 'center',
    },
    categoryButtonTextSelected: {
      color: colors.white,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: HP(2),
    },
    switchLabel: {
      fontSize: fontSize(14),
      fontWeight: '600',
      color: colors.black,
    },
    submitButton: {
      backgroundColor: colors.black,
      paddingVertical: HP(2),
      alignItems: 'center',
      borderRadius: 99,
      marginTop: HP(5),
      width: WP(50),
      alignSelf: 'center',
    },
    submitButtonText: {
      color: colors.white,
      fontSize: fontSize(16),
      fontWeight: '600',
    },
  });

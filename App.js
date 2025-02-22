import React from 'react';
import {View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider, useTheme} from './src/theme/ThemeProvider';
import SplashScreen from './src/screens/SplashScreen';

const AppContent = () => {
  const {isLoading} = useTheme();

  if (isLoading) {
    return <SplashScreen />;
  }

  return <AppNavigator />;
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

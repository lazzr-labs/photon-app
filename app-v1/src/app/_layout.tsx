import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useState, useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { PortalHost } from '@rn-primitives/portal';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from 'expo-router/react-navigation';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { NavTheme } from '~/src/theme';
import { ToastHost } from '~/src/components/toast';
import { ProfileStore } from '~/src/stores/profile.store';
import { AndroidNavigationBarSet } from '~/src/scripts/android-navigation-bar';

import '~/src/global.css';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NavTheme.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NavTheme.dark,
};

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [apiLoaded, apiLoadedSet] = useState(false);
  const [colorSchemeLoaded, colorSchemeLoadedSet] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins400: Poppins_400Regular,
    Poppins500: Poppins_500Medium,
    Poppins600: Poppins_600SemiBold,
    Poppins700: Poppins_700Bold,
  });

  useEffect(() => {
    (async () => {
      const colorTheme = (await AsyncStorage.getItem('colorScheme') || colorScheme) === 'dark' ? 'dark' : 'light';
      colorSchemeLoadedSet(true);
      setColorScheme(colorTheme);
      AndroidNavigationBarSet(colorTheme);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    (async () => {
      await ProfileStore.getState().profileInit();
      apiLoadedSet(true);
    })();
  }, []);

  if (!fontsLoaded || !colorSchemeLoaded || !apiLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <ThemeProvider value={(colorScheme === 'dark') ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={(colorScheme === 'dark') ? 'light' : 'dark'}></StatusBar>
          <Stack>
            <Stack.Screen name='(app)' options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='(auth)' options={{ headerShown: false }}></Stack.Screen>
          </Stack>
          <ToastHost />
          <PortalHost />
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

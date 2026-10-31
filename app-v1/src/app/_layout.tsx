import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { PortalHost } from '@rn-primitives/portal';
import { colorScheme as nativeColorScheme, useColorScheme } from 'nativewind';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen, Stack, router, usePathname } from 'expo-router';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from 'expo-router/react-navigation';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { NavTheme } from '~/src/theme';
import { ToastHost } from '~/src/components/toast';
import { AuthStore } from '~/src/stores/auth.store';
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
  const pathname = usePathname();

  const { authBool } = AuthStore();
  const { profileInit } = ProfileStore();

  const { colorScheme } = useColorScheme();
  const [apiLoaded, apiLoadedSet] = useState(false);
  const [themeLoaded, themeLoadedSet] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins400: Poppins_400Regular,
    Poppins500: Poppins_500Medium,
    Poppins600: Poppins_600SemiBold,
    Poppins700: Poppins_700Bold,
  });

  const appLoaded = fontsLoaded && themeLoaded && apiLoaded;

  useEffect(() => {
    (async () => {
      let colorTheme: 'light' | 'dark' | 'system' = 'system';
      try {
        const themeSaved = await AsyncStorage.getItem('colorScheme');
        if (themeSaved === 'light' || themeSaved === 'dark') {
          colorTheme = themeSaved;
        }
      } catch (error) {
        console.error(error);
      }
      nativeColorScheme.set(colorTheme);
      themeLoadedSet(true);
    })();
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    AndroidNavigationBarSet(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme, themeLoaded]);

  useEffect(() => {
    (async () => {
      await profileInit();
      apiLoadedSet(true);
    })();
  }, [profileInit]);

  useEffect(() => {
    if (!appLoaded) return;
    SplashScreen.hideAsync();
  }, [appLoaded]);

  useEffect(() => {
    if (pathname === '/' && authBool && appLoaded) {
      router.replace('/dashboard');
    }
  }, [pathname, authBool, appLoaded]);

  if (!appLoaded) {
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

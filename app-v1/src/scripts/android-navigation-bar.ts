import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export const AndroidNavigationBarSet = (theme: 'light' | 'dark') => {
  if (Platform.OS !== 'android') return;
  NavigationBar.setStyle((theme === 'dark') ? 'light' : 'dark');
};

import { Stack } from 'expo-router';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { Text } from '~/src/components/ui/text';

WebBrowser.maybeCompleteAuthSession();

const AuthCallback = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-center text-4xl text-foreground'>
          Completing sign in...
        </Text>
      </View>
    </>
  );
};

export default AuthCallback;

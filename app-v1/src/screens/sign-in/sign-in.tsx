import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SignInHeader } from './sign-in-header';
import { SignInContent } from './sign-in-content';

export const SignInScreen = () => {
  return (
    <SafeAreaView className='flex-1' edges={['top', 'left', 'right']}>

      <SignInHeader />

      <ScrollView keyboardShouldPersistTaps='handled' className='flex-1' contentContainerClassName='flex-grow'>
        <View className='items-center'>
          <View className='w-full pt-16 sm:w-1/3'>
            <SignInContent />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

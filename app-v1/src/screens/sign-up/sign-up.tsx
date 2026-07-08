import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SignUpHeader } from './sign-up-header';
import { SignUpContent } from './sign-up-content';

export const SignUpScreen = () => {
  return (
    <SafeAreaView className='flex-1' edges={['top', 'left', 'right']}>

      <SignUpHeader />

      <ScrollView keyboardShouldPersistTaps='handled' className='flex-1' contentContainerClassName='flex-grow'>
        <View className='items-center'>
          <View className='w-full pt-16 sm:w-1/3'>
            <SignUpContent />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

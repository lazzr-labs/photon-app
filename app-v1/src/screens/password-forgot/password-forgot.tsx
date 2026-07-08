import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PasswordForgotHeader } from './password-forgot-header';
import { PasswordForgotContent } from './password-forgot-content';

export const PasswordForgotScreen = () => {
  return (
    <SafeAreaView className='flex-1' edges={['top', 'left', 'right']}>

      <PasswordForgotHeader />

      <ScrollView keyboardShouldPersistTaps='handled' className='flex-1' contentContainerClassName='flex-grow'>
        <View className='items-center'>
          <View className='w-full pt-16 sm:w-1/3'>
            <PasswordForgotContent />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

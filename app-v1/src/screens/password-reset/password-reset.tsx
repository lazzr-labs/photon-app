import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PasswordResetHeader } from './password-reset-header';
import { PasswordResetContent } from './password-reset-content';

export const PasswordResetScreen = () => {
  return (
    <SafeAreaView className='flex-1' edges={['top', 'left', 'right']}>

      <PasswordResetHeader />

      <ScrollView keyboardShouldPersistTaps='handled' className='flex-1' contentContainerClassName='flex-grow'>
        <View className='items-center'>
          <View className='w-full pt-16 sm:w-1/3'>
            <PasswordResetContent />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

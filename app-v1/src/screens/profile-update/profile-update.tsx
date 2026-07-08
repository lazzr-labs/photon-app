import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileUpdateHeader } from './profile-update-header';
import { ProfileUpdateContent } from './profile-update-content';

export const ProfileUpdateScreen = () => {
  return (
    <SafeAreaView className='flex-1' edges={['top', 'left', 'right']}>

      <ProfileUpdateHeader />

      <ScrollView keyboardShouldPersistTaps='handled' className='flex-1' contentContainerClassName='flex-grow'>
        <View className='items-center'>
          <View className='w-full sm:w-1/3'>
            <ProfileUpdateContent />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

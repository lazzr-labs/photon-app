import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { UserRound } from 'lucide-react-native';

import { Icon } from '~/src/components/ui/icon';
import { ProfileStore } from '~/src/stores/profile.store';
import { Avatar, AvatarFallback, AvatarImage } from '~/src/components/ui/avatar';

export const DashboardHeader = () => {
  const { profile } = ProfileStore();

  return (
    <View className='h-16 flex-row items-center'>
      <View className='flex-1'></View>
      <View className='me-2'>
        <Link href='/profile' asChild>
          <Pressable className='rounded-full bg-primary/25 p-1'>
            <Avatar alt={'profile-image'} className='size-12'>
              {!!profile?.image && <AvatarImage source={{ uri: profile.image }} />}
              <AvatarFallback>
                <Icon as={UserRound} size={48} strokeWidth={2.5} />
              </AvatarFallback>
            </Avatar>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

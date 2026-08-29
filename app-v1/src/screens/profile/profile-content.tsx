import { Link } from 'expo-router';
import { View } from 'react-native';
import { Edit2, LogOut, UserRound } from 'lucide-react-native';

import { Icon } from '~/src/components/ui/icon';
import { Text } from '~/src/components/ui/text';
import { Button } from '~/src/components/ui/button';
import { ProfileStore } from '~/src/stores/profile.store';
import { Avatar, AvatarFallback, AvatarImage } from '~/src/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '~/src/components/ui/alert-dialog';

export const ProfileContent = () => {
  const { profile, profileLogout } = ProfileStore();

  return (
    <View className='items-center'>

      <Text variant='h2' className='mb-4'>
        Profile
      </Text>

      <View className='rounded-full bg-primary/25 p-2'>
        <Avatar alt={'profile-image'} className='size-40'>
          {!!profile?.image && <AvatarImage source={{ uri: profile.image }} />}
          <AvatarFallback>
            <Icon as={UserRound} size={160} strokeWidth={1.5} />
          </AvatarFallback>
        </Avatar>
      </View>

      <View className='mt-4 gap-2'>
        <Text variant='h2' className='text-center'>
          {profile?.name}
        </Text>
        <Text variant='small' className='text-center text-muted-foreground'>
          {profile?.email}
        </Text>
      </View>

      <View className='mt-12 w-full max-w-md gap-4 px-6'>

        <Link href='/profile-update' asChild>
          <Button variant='default' size='xl'>
            <Icon as={Edit2} size={20} className='text-secondary-foreground' />
            <Text>
              Edit Profile
            </Text>
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='link' size='xl'>
              <Icon as={LogOut} size={20} className='text-destructive' />
              <Text className='text-destructive group-hover:text-destructive group-active:text-destructive'>
                Sign Out
              </Text>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign Out</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to sign out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction onPress={profileLogout}>
                <Text>Sign Out</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </View>

    </View>
  );
};

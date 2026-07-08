import { useRef, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { View, Pressable } from 'react-native';
import type { TriggerRef } from '@rn-primitives/popover';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EllipsisVertical, Moon, Sun, Trash2 } from 'lucide-react-native';

import { Toast } from '~/src/components/toast';
import { Icon } from '~/src/components/ui/icon';
import { Text } from '~/src/components/ui/text';
import { BackButton } from '~/src/components/back-button';
import { ProfileStore } from '~/src/stores/profile.store';
import { AndroidNavigationBarSet } from '~/src/scripts/android-navigation-bar';
import { Popover, PopoverContent, PopoverTrigger } from '~/src/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/src/components/ui/alert-dialog';

export const ProfileUpdateHeader = () => {
  const { profileDelete } = ProfileStore();
  const { colorScheme, setColorScheme } = useColorScheme();
  const popoverTriggerRef = useRef<TriggerRef>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const changeTheme = () => {
    const colorTheme = (colorScheme === 'dark') ? 'light' : 'dark';
    setColorScheme(colorTheme);
    AndroidNavigationBarSet(colorTheme);
    AsyncStorage.setItem('colorScheme', colorTheme);
  };

  const profileDeleteHook = async () => {
    try {
      await profileDelete();
      Toast('Account deleted', {
        variant: 'success',
        duration: 4500,
      });
    } catch (error: any) {
      Toast(error, {
        variant: 'destructive',
        duration: 6000,
      });
    }
  };

  return (
    <>
      <View className='h-16 flex-row items-center'>
        <View className='ms-2'>
          <BackButton />
        </View>
        <View className='flex-1'></View>
        <View className='me-2 flex-row items-center gap-1'>
          <Pressable onPress={changeTheme}>
            {(colorScheme === 'dark') ? (
              <Icon as={Sun} size={48} />
            ) : (
              <Icon as={Moon} size={48} />
            )}
          </Pressable>

          <Popover>
            <PopoverTrigger asChild ref={popoverTriggerRef}>
              <Pressable className='rounded-full p-2 active:bg-accent/10 web:hover:bg-accent/10'>
                <Icon as={EllipsisVertical} size={28} />
              </Pressable>
            </PopoverTrigger>
            <PopoverContent side='bottom' align='end' className='w-56 gap-1 rounded-2xl p-2'>
              <Pressable onPress={() => { popoverTriggerRef.current?.close(); setDeleteDialogOpen(true); }} className='flex-row items-center gap-3 rounded-xl px-3 py-3 active:bg-destructive/10 web:hover:bg-destructive/10'>
                <Icon as={Trash2} size={18} className='text-destructive' />
                <Text className='text-base font-medium text-destructive'>
                  Delete Account
                </Text>
              </Pressable>
            </PopoverContent>
          </Popover>
        </View>
      </View>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? This will remove your access and sign you out.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={profileDeleteHook} className='bg-destructive active:bg-destructive/90 web:hover:bg-destructive/90'>
              <Text className='text-white'>Delete Account</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

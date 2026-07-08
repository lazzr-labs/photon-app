import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

import { Toast } from '~/src/components/toast';
import { ErrorGet } from '~/src/scripts/error';
import { Text } from '~/src/components/ui/text';
import { Input } from '~/src/components/ui/input';
import { Button } from '~/src/components/ui/button';
import { ProfileStore } from '~/src/stores/profile.store';

import { ProfileUpdateAvatar } from './profile-update-avatar';

export const ProfileUpdateContent = () => {
  const { profile, profileUpdate } = ProfileStore();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm();
  const nameValue = watch('name');

  const update = async (data: any) => {
    if (profile) {
      setLoading(true);
      profile.name = data.name;
      try {
        await profileUpdate(profile);
        Toast('Profile Updated', {
          variant: 'success',
          duration: 4500,
        });
        if (router.canGoBack()) {
          router.back();
        }
      } catch (errors: any) {
        const error = ErrorGet(errors?.response?.data);
        Toast(error, {
          variant: 'destructive',
          duration: 6000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View className='items-center'>

      <Text variant='h2' className='mb-4'>
        Update Profile
      </Text>

      <ProfileUpdateAvatar />

      <View className='w-full max-w-md gap-4 px-6'>

        <View>
          <Controller
            name='name'
            control={control}
            defaultValue={profile?.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder='Name'
                autoCapitalize='words'
                className='h-14'
              ></Input>
            )}
            rules={{
              required: true,
            }}
          ></Controller>
        </View>

        <Button onPress={handleSubmit(update)} disabled={loading || !nameValue} variant='default' size='xxl' className='mt-2'>
          {loading && <View className='h-5 w-5 animate-spin rounded-full border-[3px] border-white/30 border-t-white' />}
          <Text>
            Update
          </Text>
        </Button>

      </View>

    </View>
  );
};

import { useState } from 'react';
import { router } from 'expo-router';
import { View, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller, useFormState } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from '@react-native-blossom-ui/components';

import { authApi } from '~/src/api';
import { ErrorGet } from '~/src/scripts/error';
import { ProfileStore } from '~/src/stores/profile.store';

import { Toast } from '~/src/components/toast';
import { Icon } from '~/src/components/ui/icon';
import { Text } from '~/src/components/ui/text';
import { Input } from '~/src/components/ui/input';
import { Button } from '~/src/components/ui/button';

export const SignUpContent = () => {
  const { profileInit } = ProfileStore();

  const [loading, setLoading] = useState(false);
  const [passwordBool, setPasswordBool] = useState(false);

  const { control, handleSubmit, watch } = useForm();
  const { errors } = useFormState({ control });
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const signUp = async (data: any) => {
    setLoading(true);
    try {
      const response = await authApi.signUpAPI({
        email: data.email,
        password: data.password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await profileInit();
      Toast('Welcome to Photon', {
        variant: 'success',
        duration: 4500,
      });
      router.replace('/dashboard');
    } catch (errors: any) {
      const error = ErrorGet(errors?.response?.data);
      Toast(error, {
        variant: 'destructive',
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='items-center'>

      <Text variant='h2' className='mb-4'>
        Sign Up
      </Text>

      <View className='w-full max-w-md gap-4 px-6'>

        <View>
          <Controller
            name='email'
            control={control}
            defaultValue={''}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder='Email'
                autoCapitalize='none'
                keyboardType='email-address'
                className='h-14'
              ></Input>
            )}
            rules={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
          ></Controller>
          {errors.email && (
            <Text className='mt-1 text-sm text-destructive'>
              {errors.email.type === 'pattern' && 'Please enter a valid email format'}
            </Text>
          )}
        </View>

        <View>
          <Controller
            name='password'
            control={control}
            defaultValue={''}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='relative'>
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder='Password'
                  secureTextEntry={!passwordBool}
                  className='h-14 pr-12'
                ></Input>
                <Pressable onPress={() => setPasswordBool(!passwordBool)} className='absolute right-3 top-1/2 -translate-y-1/2'>
                  <Icon as={passwordBool ? EyeOff : Eye} size={24} className='text-muted-foreground' />
                </Pressable>
              </View>
            )}
            rules={{
              minLength: 8,
              required: true,
            }}
          ></Controller>
          {errors.password && (
            <Text className='mt-1 text-sm text-destructive'>
              {errors.password.type === 'minLength' && 'Password must be at least 8 characters'}
            </Text>
          )}
        </View>

        <Button onPress={handleSubmit(signUp)} disabled={loading || !emailValue || !passwordValue} variant='default' size='xxl' className='mt-2'>
          {loading && <ActivityIndicator size={16} color='white' />}
          <Text>
            Sign Up
          </Text>
        </Button>

      </View>

    </View>
  );
};

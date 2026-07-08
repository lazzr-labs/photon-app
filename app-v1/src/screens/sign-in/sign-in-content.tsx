import { useState } from 'react';
import { Link, router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { View, Pressable, Image } from 'react-native';
import { useForm, Controller, useFormState } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authApi } from '~/src/api';
import { ErrorGet } from '~/src/scripts/error';
import { ProfileStore } from '~/src/stores/profile.store';
import { AppleSignIn, GoogleSignIn } from '~/src/scripts/supabase';

import { Toast } from '~/src/components/toast';
import { Icon } from '~/src/components/ui/icon';
import { Text } from '~/src/components/ui/text';
import { Input } from '~/src/components/ui/input';
import { Button } from '~/src/components/ui/button';

export const SignInContent = () => {
  const { profileInit } = ProfileStore();

  const [loading, setLoading] = useState(false);
  const [passwordBool, setPasswordBool] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm();
  const { errors } = useFormState({ control });
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const signIn = async (data: any) => {
    setLoading(true);
    try {
      const response = await authApi.signInAPI({
        email: data.email,
        password: data.password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await profileInit();
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

  const googleSignInHook = async () => {
    setGoogleLoading(true);
    try {
      const { token } = await GoogleSignIn();
      const { data } = await authApi.signInSupabaseAPI({
        token: token,
      });
      await AsyncStorage.setItem('token', data.token);
      await profileInit();
      router.replace('/dashboard');
    } catch (errors: any) {
      const error = errors?.response?.data?.detail ?? errors?.message ?? 'Google Sign In Failed';
      Toast(error, {
        variant: 'destructive',
        duration: 6000,
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const appleSignInHook = async () => {
    setAppleLoading(true);
    try {
      const { token } = await AppleSignIn();
      const { data } = await authApi.signInSupabaseAPI({
        token: token,
      });
      await AsyncStorage.setItem('token', data.token);
      await profileInit();
      router.replace('/dashboard');
    } catch (errors: any) {
      const error = errors?.response?.data?.detail ?? errors?.message ?? 'Apple Sign In Failed';
      Toast(error, {
        variant: 'destructive',
        duration: 6000,
      });
    } finally {
      setAppleLoading(false);
    }
  };

  return (
    <View className='items-center'>

      <Text variant='h2' className='mb-4'>
        Sign In
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
              required: true,
            }}
          ></Controller>
        </View>

        <Button onPress={handleSubmit(signIn)} disabled={loading || !emailValue || !passwordValue} variant='default' size='xxl' className='mt-2'>
          {loading && <View className='h-5 w-5 animate-spin rounded-full border-[3px] border-white/30 border-t-white' />}
          <Text>
            Sign In
          </Text>
        </Button>

        <Button onPress={googleSignInHook} disabled={googleLoading} variant='outline' size='xxl' className='mt-2 w-full gap-3 rounded-2xl border-border bg-background px-5'>
          <View style={{ width: 20, height: 20 }}>
            <Image source={require('~/src/assets/images/platforms/g-logo.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
          </View>
          <Text className='font-semibold tracking-tight text-foreground'>
            Continue with Google
          </Text>
        </Button>

        <Button onPress={appleSignInHook} disabled={appleLoading} variant='outline' size='xxl' className='w-full gap-3 rounded-2xl border-border bg-background px-5'>
          <View style={{ width: 20, height: 20 }}>
            <Image source={require('~/src/assets/images/platforms/ios-logo.png')} style={{ width: 17, height: 20 }} resizeMode='contain' />
          </View>
          <Text className='font-semibold tracking-tight text-foreground'>
            Continue with iOS
          </Text>
        </Button>

        <Link href='/password-forgot' asChild>
          <Button variant='link' className='mt-4'>
            <Text className='text-base text-primary'>
              Forgot Password?
            </Text>
          </Button>
        </Link>

      </View>

    </View>
  );
};

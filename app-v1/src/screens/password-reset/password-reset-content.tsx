import { useState } from 'react';
import { router } from 'expo-router';
import { View, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller, useFormState } from 'react-hook-form';

import { authApi } from '~/src/api';
import { ErrorGet } from '~/src/scripts/error';

import { Toast } from '~/src/components/toast';
import { Icon } from '~/src/components/ui/icon';
import { Text } from '~/src/components/ui/text';
import { Input } from '~/src/components/ui/input';
import { Button } from '~/src/components/ui/button';

export const PasswordResetContent = () => {
  const [loading, setLoading] = useState(false);
  const [passwordBool, setPasswordBool] = useState(false);

  const { control, handleSubmit, watch } = useForm();
  const { errors } = useFormState({ control });
  const codeValue = watch('code');
  const passwordValue = watch('password');

  const passwordReset = async (data: any) => {
    setLoading(true);
    try {
      await authApi.passwordResetPostAPI({
        code: data.code,
        password: data.password,
      });
      router.replace('/sign-in');
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
        Reset Password
      </Text>

      <View className='w-full max-w-md gap-4 px-6'>

        <View>
          <Controller
            name='code'
            control={control}
            defaultValue={''}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder='Code'
                className='h-14'
              ></Input>
            )}
            rules={{
              required: true,
            }}
          ></Controller>
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

        <Button onPress={handleSubmit(passwordReset)} disabled={loading || !codeValue || !passwordValue} variant='default' size='xxl' className='mt-2'>
          {loading && <View className='h-5 w-5 animate-spin rounded-full border-[3px] border-white/30 border-t-white' />}
          <Text>
            Submit
          </Text>
        </Button>

      </View>

    </View>
  );
};

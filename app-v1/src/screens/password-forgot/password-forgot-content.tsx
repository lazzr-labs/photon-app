import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { ActivityIndicator } from '@react-native-blossom-ui/components';

import { authApi } from '~/src/api';
import { ErrorGet } from '~/src/scripts/error';

import { Toast } from '~/src/components/toast';
import { Text } from '~/src/components/ui/text';
import { Input } from '~/src/components/ui/input';
import { Button } from '~/src/components/ui/button';

export const PasswordForgotContent = () => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm();
  const { errors } = useFormState({ control });
  const emailValue = watch('email');

  const passwordForgot = async (data: any) => {
    setLoading(true);
    try {
      await authApi.passwordForgotPostAPI({
        email: data.email,
      });
      router.replace('/password-reset');
    } catch (errors: any) {
      const error = ErrorGet(errors.response.data);
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
        Forgot Password
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

        <Button onPress={handleSubmit(passwordForgot)} disabled={loading || !emailValue} variant='default' size='xxl' className='mt-2'>
          {loading && <ActivityIndicator size={16} color='white' />}
          <Text>
            Send
          </Text>
        </Button>

      </View>

    </View>
  );
};

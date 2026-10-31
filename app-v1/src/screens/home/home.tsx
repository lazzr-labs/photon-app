import { Link } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '~/src/components/ui/text';
import { Button } from '~/src/components/ui/button';

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className='items-center'>
        <View className='w-full items-center pt-16 sm:w-1/3'>

          <Text className='mb-24 mt-24 pt-2 font-Poppins500 text-8xl text-foreground'>
            Photon
          </Text>

          <View className='gap-6'>

            <Link href='/sign-up' push asChild>
              <Button className='h-20 w-96 rounded-full bg-primary hover:bg-primary/90 active:bg-primary'>
                <Text className='font-Poppins500 text-4xl text-background'>
                  Sign Up
                </Text>
              </Button>
            </Link>

            <Link href='/sign-in' push asChild>
              <Button className='h-20 w-96 rounded-full bg-primary hover:bg-primary/90 active:bg-primary'>
                <Text className='font-Poppins500 text-4xl text-background'>
                  Sign In
                </Text>
              </Button>
            </Link>

          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

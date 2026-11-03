import { useEffect, useState } from 'react';
import { cssInterop } from 'nativewind';
import * as ImagePicker from 'expo-image-picker';
import { Pencil, UserRound } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';

import { ErrorGet } from '~/src/scripts/error';
import { Toast } from '~/src/components/toast';
import { Icon } from '~/src/components/ui/icon';
import { Cropper } from '~/src/components/cropper';
import { ProfileStore } from '~/src/stores/profile.store';
import { Avatar, AvatarFallback, AvatarImage } from '~/src/components/ui/avatar';

cssInterop(Pencil, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: 'color',
    },
  },
});

const imageUriRevoke = (uri: string) => {
  if (Platform.OS === 'web' && uri.startsWith('blob:')) {
    URL.revokeObjectURL(uri);
  }
};

export const ProfileUpdateAvatar = () => {
  const { profile, profileUpdateImage } = ProfileStore();

  const [imageUri, setImageUri] = useState<string>('');
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    return () => {
      imageUriRevoke(imageUri);
    };
  }, [imageUri]);

  const imageChoose = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast('Photo permission required', {
        variant: 'destructive',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      preferredAssetRepresentationMode: ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Compatible,
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const imageUri = asset.uri;
      if (Platform.OS === 'web') {
        setImageUri(imageUri);
        setShowCropper(true);
      } else {
        try {
          await profileUpdateImage(
            imageUri,
            asset.mimeType ?? 'image/jpeg',
            imageUri.split('/').pop() ?? asset.fileName ?? 'avatar.jpg',
          );
          Toast('Profile Picture Updated Successfully', {
            variant: 'success',
          });
        } catch (errors: any) {
          Toast(ErrorGet(errors?.response?.data ?? { detail: errors?.message ?? 'Failed to update profile picture.' }), {
            variant: 'destructive',
          });
        }
      }
    }
  };

  const onComplete = async (uri: string) => {
    setShowCropper(false);
    setImageUri('');
    try {
      await profileUpdateImage(uri, 'image/png', 'avatar.png');
      Toast('Profile Picture Updated Successfully', {
        variant: 'success',
      });
    } catch (errors: any) {
      Toast(ErrorGet(errors?.response?.data ?? { detail: errors?.message ?? 'Failed to update profile picture.' }), {
        variant: 'destructive',
      });
    } finally {
      imageUriRevoke(uri);
    }
  };

  const onCancel = () => {
    setShowCropper(false);
    setImageUri('');
  };

  return (
    <View>

      <Pressable onPress={imageChoose} className='mb-4'>
        <View className='relative rounded-full bg-primary/25 p-2'>
          <Avatar alt='profile-image' className='size-40'>
            {!!profile?.image && <AvatarImage source={{ uri: profile.image }} />}
            <AvatarFallback>
              <Icon as={UserRound} size={160} strokeWidth={1.5} />
            </AvatarFallback>
          </Avatar>
          <View className='absolute right-3 top-3 z-10 items-center justify-center rounded-full bg-accent p-2'>
            <Pencil size={20} strokeWidth={2.5} className='text-white' />
          </View>
        </View>
      </Pressable>

      {Platform.OS === 'web' && (
        <Cropper
          maxSize={512}
          uri={imageUri}
          visible={showCropper}
          onComplete={onComplete}
          onCancel={onCancel}
        ></Cropper>
      )}

    </View>
  );
};

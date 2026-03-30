import { Modal, TouchableOpacity, View } from 'react-native';
import { ReactCrop, type Crop, type PixelCrop } from 'react-image-crop';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

import { Text } from '~/src/components/ui/text';

import 'react-image-crop/dist/ReactCrop.css';

type CropperProps = {
  uri: string;
  visible: boolean;
  onComplete: (uri: string) => void;
  onCancel: () => void;
};

const croppedImageGet = async (image: HTMLImageElement, crop: PixelCrop): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/jpeg');
  });
};

export const Cropper = ({ uri, visible, onComplete, onCancel }: CropperProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [cropCompleted, setCropCompleted] = useState<PixelCrop>();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!visible) {
      setCropCompleted(undefined);
    }
  }, [visible, uri]);

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = event.currentTarget;
    const size = Math.min(width, height) * 0.8;
    const cropCentered: Crop = {
      unit: 'px',
      x: (width - size) / 2,
      y: (height - size) / 2,
      width: size,
      height: size,
    };

    setCrop(cropCentered);
    setCropCompleted({
      x: cropCentered.x,
      y: cropCentered.y,
      width: cropCentered.width,
      height: cropCentered.height,
      unit: 'px',
    });
  };

  const imageSave = async () => {
    if (cropCompleted && imageRef.current) {
      try {
        const croppedImageUrl = await croppedImageGet(imageRef.current, cropCompleted);
        onComplete(croppedImageUrl);
      } catch (errors) {
        console.error('Error cropping image:', errors);
      }
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <View className='flex-1 bg-black/95'>

        <View className='flex-1 items-center justify-center p-5'>
          <ReactCrop aspect={1} crop={crop} onChange={setCrop} onComplete={setCropCompleted} circularCrop>
            <img
              src={uri}
              ref={imageRef}
              onLoad={onImageLoad}
              style={{ maxHeight: '70vh', maxWidth: '100%' }}
              alt='Crop Preview'
            />
          </ReactCrop>
        </View>

        <View className='flex-row justify-between gap-4 p-5'>
          <TouchableOpacity onPress={onCancel} className='flex-1 items-center rounded-lg bg-gray-500 p-4'>
            <Text className='text-lg font-semibold text-white'>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={imageSave} className='flex-1 items-center rounded-lg bg-blue-500 p-4'>
            <Text className='text-lg font-semibold text-white'>
              Save
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
};

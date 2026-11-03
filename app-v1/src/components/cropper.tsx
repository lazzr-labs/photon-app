import { Modal, View } from 'react-native';
import { ReactCrop, type PercentCrop } from 'react-image-crop';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

import { Text } from '~/src/components/ui/text';
import { Button } from '~/src/components/ui/button';

import 'react-image-crop/dist/ReactCrop.css';

type CropperProps = {
  uri: string;
  visible: boolean;
  aspect?: number;
  shape?: 'circle' | 'rectangle';
  maxSize?: number;
  onComplete: (uri: string) => void;
  onCancel: () => void;
};

const croppedImageGet = async (image: HTMLImageElement, crop: PercentCrop, aspect: number, maxSize: number): Promise<string> => {
  const sourceX = Math.max(0, Math.round((crop.x / 100) * image.naturalWidth));
  const sourceY = Math.max(0, Math.round((crop.y / 100) * image.naturalHeight));
  const sourceRight = Math.min(image.naturalWidth, Math.round(((crop.x + crop.width) / 100) * image.naturalWidth));
  const sourceBottom = Math.min(image.naturalHeight, Math.round(((crop.y + crop.height) / 100) * image.naturalHeight));
  let sourceWidth = sourceRight - sourceX;
  let sourceHeight = sourceBottom - sourceY;

  // Independent edge rounding must not turn a square crop into a rectangle.
  if (aspect === 1) {
    sourceWidth = sourceHeight = Math.min(sourceWidth, sourceHeight);
  }

  if (!Number.isFinite(sourceWidth) || !Number.isFinite(sourceHeight) || sourceWidth <= 0 || sourceHeight <= 0) {
    throw new Error('Select an area to crop.');
  }

  const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(sourceWidth * scale));
  canvas.height = Math.max(1, Math.round(sourceHeight * scale));

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to process this image.');
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) {
        resolve(result);
      } else {
        reject(new Error('Unable to export this image.'));
      }
    }, 'image/png');
  });

  return URL.createObjectURL(blob);
};

export const Cropper = ({ uri, visible, aspect = 1, shape = 'circle', maxSize = 1024, onComplete, onCancel }: CropperProps) => {
  if (!visible) return null;

  if (!Number.isFinite(aspect) || aspect <= 0) {
    throw new Error('Cropper aspect must be a positive number.');
  }
  if (shape === 'circle' && aspect !== 1) {
    throw new Error('A circular crop preview requires aspect={1}.');
  }
  if (!Number.isSafeInteger(maxSize) || maxSize <= 0) {
    throw new Error('Cropper maxSize must be a positive integer.');
  }

  return (
    <CropperContent
      key={`${uri}:${aspect}:${shape}:${maxSize}`}
      uri={uri}
      aspect={aspect}
      shape={shape}
      maxSize={maxSize}
      onComplete={onComplete}
      onCancel={onCancel}
    ></CropperContent>
  );
};

const CropperContent = ({ uri, aspect = 1, shape = 'circle', maxSize = 1024, onComplete, onCancel }: Omit<CropperProps, 'visible'>) => {
  const [crop, setCrop] = useState<PercentCrop>();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const imageRef = useRef<HTMLImageElement>(null);
  const savingRef = useRef(false);
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) {
      setCrop(undefined);
      setError('Unable to load this image.');
      return;
    }

    const width = Math.min(naturalWidth * 0.8, naturalHeight * 0.8 * aspect);
    const height = width / aspect;
    const widthPercent = (width / naturalWidth) * 100;
    const heightPercent = (height / naturalHeight) * 100;

    setCrop({
      unit: '%',
      x: (100 - widthPercent) / 2,
      y: (100 - heightPercent) / 2,
      width: widthPercent,
      height: heightPercent,
    });
    setError('');
  };

  const imageSave = async () => {
    if (savingRef.current || !imageRef.current || !crop?.width || !crop.height) return;

    savingRef.current = true;
    setSaving(true);
    setError('');

    let outputUri: string | undefined;
    try {
      outputUri = await croppedImageGet(imageRef.current, crop, aspect, maxSize);
      if (!activeRef.current) {
        URL.revokeObjectURL(outputUri);
        return;
      }

      // The caller owns the output URL and releases it after its last use.
      onComplete(outputUri);
    } catch (errors) {
      if (outputUri) URL.revokeObjectURL(outputUri);
      if (activeRef.current) {
        setError(errors instanceof Error ? errors.message : 'Unable to crop this image.');
      }
    } finally {
      savingRef.current = false;
      if (activeRef.current) setSaving(false);
    }
  };

  return (
    <Modal visible transparent animationType='fade' onRequestClose={() => { if (!savingRef.current) onCancel(); }}>
      <View className='flex-1 bg-black/95'>

        <View className='flex-1 items-center justify-center p-5'>
          <ReactCrop
            crop={crop}
            aspect={aspect}
            circularCrop={shape === 'circle'}
            disabled={saving}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
          >
            <img
              ref={imageRef}
              src={uri}
              alt='Crop preview'
              crossOrigin='anonymous'
              onLoad={onImageLoad}
              onError={() => {
                setCrop(undefined);
                setError('Unable to load this image.');
              }}
              style={{ display: 'block', maxHeight: '70vh', maxWidth: '100%' }}
            ></img>
          </ReactCrop>
        </View>

        {!!error && (
          <Text accessibilityRole='alert' className='px-5 text-center text-white'>
            {error}
          </Text>
        )}

        <View className='flex-row gap-4 p-5'>
          <Button variant='secondary' disabled={saving} onPress={onCancel} className='h-auto flex-1 rounded-lg p-4'>
            <Text className='text-lg font-semibold'>Cancel</Text>
          </Button>
          <Button disabled={saving || !crop?.width || !crop.height} onPress={imageSave} className='h-auto flex-1 rounded-lg p-4'>
            <Text className='text-lg font-semibold'>{saving ? 'Saving…' : 'Save'}</Text>
          </Button>
        </View>

      </View>
    </Modal>
  );
};

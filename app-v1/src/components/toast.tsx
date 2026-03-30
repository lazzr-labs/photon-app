import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type ToastVariant = 'default' | 'success' | 'destructive';

type ToastRecord = {
  id: number;
  title: string;
  duration: number;
  variant: ToastVariant;
};

let toasts: ToastRecord[] = [];
let listeners: (() => void)[] = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((currentListener) => currentListener !== listener);
  };
};

function addToast(title: string, variant: ToastVariant = 'default', duration = 6000) {
  const id = Date.now() + Math.random();
  toasts = [...toasts, { id, title, variant, duration }];
  listeners.forEach((listener) => listener());
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
};

function removeToast(id: number) {
  const next = toasts.filter(toast => toast.id !== id);
  if (next.length !== toasts.length) {
    toasts = next;
    listeners.forEach((listener) => listener());
  }
};

type ToastItemProps = {
  toast: ToastRecord;
  iconVariant: string;
  stylesVariant: {
    container: string;
    text: string;
    icon: string;
    closeIcon: string;
  };
  onRemove: () => void;
};

function ToastItem({ toast, iconVariant, stylesVariant, onRemove }: ToastItemProps) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const handleRemove = () => {
    translateY.value = withTiming(-200, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetY([-5, 5])
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
        opacity.value = Math.max(0, 1 + event.translationY / 200);
      } else {
        translateY.value = 0;
        opacity.value = 1;
      }
    })
    .onEnd((event) => {
      if (event.translationY < -50) {
        handleRemove();
      } else {
        translateY.value = withTiming(0, { duration: 200 });
        opacity.value = withTiming(1, { duration: 200 });
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={animatedStyle} className='w-full items-center'>
        <Pressable onPress={handleRemove} className='w-full pb-4'>
          <View className={`mx-auto min-h-14 w-full max-w-[420px] flex-row items-center gap-3 rounded-full border px-4 py-3 shadow-lg shadow-black/20 ${stylesVariant.container}`}>
            <View className='h-8 w-8 items-center justify-center rounded-full'>
              <Ionicons name={iconVariant as any} size={32} className={stylesVariant.icon} />
            </View>
            <View className='flex-1'>
              <Text className={`text-lg font-semibold ${stylesVariant.text}`} numberOfLines={2}>
                {toast.title}
              </Text>
            </View>
            <View className='h-8 w-8 items-center justify-center rounded-full'>
              <Ionicons name='close' size={32} className={stylesVariant.closeIcon} />
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

function ToastHost() {
  const [current, setCurrent] = useState<ToastRecord[]>(toasts);
  const insets = useSafeAreaInsets();

  useEffect(() => subscribe(() => setCurrent([...toasts])), []);
  if (current.length === 0) return null;

  const getToastIcon = (variant: ToastVariant) => {
    switch (variant) {
      case 'success':
        return 'checkmark-circle';
      case 'destructive':
        return 'alert-circle';
      default:
        return 'information-circle';
    }
  };

  const getToastStyles = (variant: ToastVariant) => {
    switch (variant) {
      case 'success':
        return {
          container: 'bg-emerald-500 border-emerald-400',
          text: 'text-white',
          icon: 'text-white',
          closeIcon: 'text-white',
        };
      case 'destructive':
        return {
          container: 'bg-rose-500 border-rose-400',
          text: 'text-white',
          icon: 'text-white',
          closeIcon: 'text-white',
        };
      default:
        return {
          container: 'bg-neutral-900 border-neutral-700',
          text: 'text-white',
          icon: 'text-white',
          closeIcon: 'text-white',
        };
    }
  };

  return (
    <View pointerEvents='box-none' className='absolute left-0 right-0 z-[9999] w-full px-4' style={{ top: insets.top + 16 }}>
      <View pointerEvents='box-none' className='w-full items-center gap-2'>
        {current.map((toast) => {
          const iconVariant = getToastIcon(toast.variant);
          const stylesVariant = getToastStyles(toast.variant);
          return (
            <ToastItem
              key={toast.id}
              toast={toast}
              iconVariant={iconVariant}
              stylesVariant={stylesVariant}
              onRemove={() => removeToast(toast.id)}
            />
          );
        })}
      </View>
    </View>
  );
};

function Toast(title: string, options?: { variant?: ToastVariant; duration?: number }) {
  addToast(title, options?.variant ?? 'default', options?.duration ?? 6000);
};

export { Toast, ToastHost };
export type { ToastVariant, ToastRecord };

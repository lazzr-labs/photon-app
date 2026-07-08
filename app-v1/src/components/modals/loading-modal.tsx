import { Modal, View } from 'react-native';

interface LoadingModalProps {
  visible: boolean;
  onRequestClose?: () => void;
}

export const LoadingModal = ({ visible, onRequestClose = () => {} }: LoadingModalProps) => {
  return (
    <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View className='flex-1 items-center justify-center bg-black/65'>
        <View className='h-24 w-24 animate-spin rounded-full border-[10px] border-white/30 border-t-white' />
      </View>
    </Modal>
  );
};

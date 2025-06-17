import { Button, Sheet, SheetContent } from '@/components/ui';
import { Camera, Image } from 'lucide-react-native';
import { Dimensions, Text, View } from 'react-native';

interface ImageSelectModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onPressCamera: () => Promise<void>;
  onPressFile: () => Promise<void>;
}

export default function ImageSelectModal({ isOpen, onClose, onPressCamera, onPressFile }: ImageSelectModalProps) {
  const handlePressCameraButton = async () => {
    onClose(false);
    await onPressCamera();
  };

  const handlePressFileButton = async () => {
    onClose(false);
    await onPressFile();
  };

  return (
    <Sheet isOpen={isOpen} onOpenChange={onClose}>
      <SheetContent position="bottom" size={Math.max(Dimensions.get('window').height * 0.2, 200)} title="작업 선택">
        <View className="flex h-full w-full flex-1 items-center justify-center">
          <View className="flex w-full max-w-[600px] justify-between px-6">
            <Button variant="ghost" size="none" className="aspect-square p-8" onPress={handlePressCameraButton}>
              <View className="flex flex-col gap-2">
                <View className="flex items-center justify-center rounded-md bg-gray-200 p-2">
                  <Camera size={28} color="black" />
                </View>
                <View className="flex justify-center">
                  <Text>카메라</Text>
                </View>
              </View>
            </Button>
            <Button variant="ghost" size="none" className="aspect-square p-8" onPress={handlePressFileButton}>
              <View className="flex flex-col gap-2">
                <View className="flex items-center justify-center rounded-md bg-gray-200 p-2">
                  <Image size={28} color="black" />
                </View>
                <View className="flex justify-center">
                  <Text>내 파일</Text>
                </View>
              </View>
            </Button>
          </View>
        </View>
      </SheetContent>
    </Sheet>
  );
}

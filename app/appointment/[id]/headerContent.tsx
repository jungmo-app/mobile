import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { useDeleteAppointment } from '@/hooks/useMutation/useDeleteAppointment';
import { useLocalSearchParams } from 'expo-router';
import { MoreVertical, Share2 } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

interface HeaderContentProps {
  isEditable: boolean;
}

export default function HeaderContent({ isEditable }: HeaderContentProps) {
  const { id } = useLocalSearchParams();

  const [isOpenMore, setIsOpenMore] = useState(false);
  const { mutate: deleteAppointment, isPending } = useDeleteAppointment(Number(id));

  const handlePressDeleteButton = () => {
    deleteAppointment();
  };

  return (
    <View className="flex items-center gap-2">
      <Button variant="ghost" size="icon" aria-label="공유 버튼">
        <Share2 size={16} color="black" />
      </Button>
      {isEditable && (
        <Popover isOpen={isOpenMore} onOpenChange={setIsOpenMore}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0 self-start" aria-label="더보기">
              <MoreVertical size={16} color="black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent width={144} height={48}>
            <View className="flex h-12 w-36 items-center justify-center p-0 text-sm">
              <Button
                variant="ghost"
                aria-label="삭제"
                title="삭제하기"
                disabled={isPending}
                className="w-full"
                onPress={handlePressDeleteButton}
              />
            </View>
          </PopoverContent>
        </Popover>
      )}
    </View>
  );
}

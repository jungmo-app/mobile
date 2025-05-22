import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { MoreVertical, Share2 } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function HeaderContent() {
  const isEditable = true;

  const [isOpenMore, setIsOpenMore] = useState(false);

  console.log(isOpenMore);

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
          <PopoverContent>
            <View className="flex h-12 w-36 items-center justify-center p-0 text-sm">
              <Button variant="ghost" aria-label="삭제" title="삭제하기" className="w-full" />
            </View>
          </PopoverContent>
        </Popover>
      )}
    </View>
  );
}

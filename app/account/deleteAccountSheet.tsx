import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { ButtonContext } from '@/context/ButtonPressContext';
import { ChevronRight } from 'lucide-react-native';
import { useContext, useState } from 'react';
import { Text } from 'react-native';

export default function DeleteAccountSheet() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isPressed } = useContext(ButtonContext);
  const handleDeleteAccount = () => {
    console.log('delete');
    setIsOpen(false);
  };

  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="none" className="flex w-full justify-between px-5 py-4" disabled={isOpen}>
          <Text className={`text-lg ${isPressed ? 'text-gray-300' : 'text-gray-500'}`}>계정 삭제하기</Text>
          <ChevronRight size={16} color={isPressed ? '#d1d5db' : '#6b7280'} />
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" size={200}>
        <SheetHeader className="mb-4">
          <SheetTitle>정말 탈퇴하시겠어요?</SheetTitle>
          <Text className="text-base text-gray-600">
            탈퇴 시 모든 데이터는 즉시 삭제되며, 이 작업은 되돌릴 수 없어요.
          </Text>
        </SheetHeader>
        <SheetFooter className="flex-col gap-2">
          <Button
            variant="destructive"
            className="w-full"
            disabled={isPressed}
            aria-label="탈퇴"
            title="탈퇴하기"
            onPress={handleDeleteAccount}
          />
          <SheetClose>
            <Button variant="outline" className="w-full" aria-label="취소" disabled={isPressed} title="취소" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

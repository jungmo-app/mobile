import { Button, Input, Label, Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';
import { ButtonContext } from '@/context/ButtonPressContext';
import { changePasswordSchema } from '@/schemas/auth';
import { ChangePasswordFormValues } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react-native';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function ChangePasswordSheet() {
  const { control, formState, handleSubmit, getValues } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { isPressed } = useContext(ButtonContext);

  const handlePressSubmitButton = () => {
    console.log(getValues);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="none" className="flex w-full justify-between px-5 py-4" disabled={isPressed}>
          <Text className={`text-lg ${isPressed ? 'text-gray-300' : 'text-gray-500'}`}>비밀번호 변경하기</Text>
          <ChevronRight size={16} color={isPressed ? '#d1d5db' : '#6b7280'} />
        </Button>
      </SheetTrigger>
      <SheetContent size={400}>
        <SheetTitle>비밀번호 변경</SheetTitle>
        <View className="flex relative flex-1 flex-col gap-4 pt-4">
          <View className="flex flex-col">
            <Label className="font-bold">현재 비밀번호</Label>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <Input secureTextEntry placeholder="현재 비밀번호를 입력해주세요" {...field} className="mt-2" />
              )}
            />
            <Text className={`ml-2 mt-1 font-bold text-destructive ${!formState.errors.oldPassword && 'invisible'}`}>
              {formState.errors.oldPassword?.message}
            </Text>
          </View>
          <View className="flex flex-col">
            <Label className="font-bold">새 비밀번호</Label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input secureTextEntry placeholder="현재 비밀번호를 입력해주세요" {...field} className="mt-2" />
              )}
            />

            <Text className={`ml-2 mt-1 font-bold text-destructive ${!formState.errors.newPassword && 'invisible'}`}>
              {formState.errors.newPassword?.message}
            </Text>
          </View>
          <View className="flex flex-col">
            <Label className="font-bold">새 비밀번호 확인</Label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input secureTextEntry placeholder="현재 비밀번호를 입력해주세요" {...field} className="mt-2" />
              )}
            />
            <Text
              className={`ml-2 mt-1 font-bold text-destructive ${!formState.errors.confirmPassword && 'invisible'}`}
            >
              {formState.errors.confirmPassword?.message}
            </Text>
          </View>
          <View className="absolute bottom-1 w-full">
            <Button
              className="h-12 w-full"
              disabled={!formState.isValid || isPressed}
              aria-label="변경"
              title="변경하기"
              onPress={handleSubmit(handlePressSubmitButton)}
            />
          </View>
        </View>
      </SheetContent>
    </Sheet>
  );
}

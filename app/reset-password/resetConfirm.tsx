import Header from '@/components/header';
import { Button, Input, Label } from '@/components/ui';
import { usePasswordReset } from '@/hooks/useMutation/usePasswordReset';
import { resetPasswordSchema } from '@/schemas/auth';
import { ResetPasswordFormValues } from '@/types/auth';
import { ApiError } from '@/utils/api';
import { mergeRefs } from '@/utils/mergeRefs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

interface ResetConfirmProps {
  token: string;
}

export default function ResetConfirm({ token }: ResetConfirmProps) {
  const router = useRouter();
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { mutate: resetPassword, isPending } = usePasswordReset({
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다');
      router.push('/');
    },
    onError: (error: ApiError) => {
      if (error.status === 401) {
        alert('만료된 url입니다');
        router.push('/login');
        return;
      }
      alert('비밀번호 초기화에 실패하였습니다');
    },
  });

  const {
    control,
    formState: { errors },
    formState,
    handleSubmit,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const handleConfirmSubmit = (data: ResetPasswordFormValues) => {
    resetPassword({ newPassword: data.newPassword, token });
  };
  return (
    <View className="flex size-full flex-col bg-background">
      <Header routeUrl="/login" title="비밀번호 재설정" />
      <View className="p-3">
        <View>
          <Text className="text-xl font-bold">새로 변경할 비밀번호를 입력해주세요</Text>
        </View>
        <View className="flex mt-5 flex-col gap-3">
          <View>
            <Label>새 비밀번호</Label>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { ref, ...fields } }) => (
                <Input
                  {...fields}
                  secureTextEntry
                  ref={mergeRefs(newPasswordRef, ref)}
                  placeholder="새 비밀번호를 입력해주세요"
                  className="mt-2"
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
              )}
            />
            <Text className="ml-2 mt-1 text-red-500">{errors.newPassword?.message}</Text>
          </View>
          <View>
            <Label>새 비밀번호 확인</Label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { ref, ...fields } }) => (
                <Input
                  {...fields}
                  secureTextEntry
                  ref={mergeRefs(confirmPasswordRef, ref)}
                  placeholder="새 비밀번호를 다시 입력해주세요"
                  className="mt-2"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    handleSubmit(handleConfirmSubmit)();
                    if (!formState.isValid) {
                      confirmPasswordRef.current?.focus();
                    }
                  }}
                />
              )}
            />
            <Text className="ml-2 mt-1 text-red-500">{errors.confirmPassword?.message}</Text>
          </View>
        </View>

        <Button
          className="mt-6 h-12 w-full"
          title="비밀번호 변경하기"
          titleClassName="font-semibold"
          disabled={isPending || !formState.isValid}
          onPress={handleSubmit(handleConfirmSubmit)}
        />
      </View>
    </View>
  );
}

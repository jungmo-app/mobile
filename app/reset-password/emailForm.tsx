'use client';

import { Input, LoadingButton } from '@/components/ui';
import { setPasswordSchema } from '@/schemas/auth';
import { SetPasswordFormValues } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

interface EmailFormProps {
  onSubmit: () => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const [pending, setPending] = useState(false);
  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = (data: SetPasswordFormValues) => {
    setPending(true);
    console.log(data);
    setTimeout(() => {
      setPending(false);
      onSubmit();
    }, 3000);
  };
  return (
    <View className="flex w-full max-w-[400px] flex-col gap-8 p-2">
      <View className="flex flex-col p-1">
        <Text className="text-gray-500">가입하신 이메일 정보를 입력해주세요.</Text>
        <Text className="text-gray-500">해당 이메일로 초기화 링크를 보내드립니다.</Text>
      </View>

      <Controller
        control={form.control}
        name="email"
        render={({ field }) => <Input className="h-12 px-4" placeholder="이메일을 입력해주세요" {...field} />}
      />
      <LoadingButton
        disabled={!form.formState.isValid}
        className="h-12 w-full"
        isLoading={pending}
        loadingText="링크 생성 중"
        onPress={form.handleSubmit(handleSubmit)}
      >
        <Text className="text-background">링크 생성하기</Text>
      </LoadingButton>
    </View>
  );
}

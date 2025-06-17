import { LoadingButton } from '@/components/loadingButton';
import { Input } from '@/components/ui';
import { useRequestEmail } from '@/hooks/useMutation/useRequestEmail';
import { setPasswordSchema } from '@/schemas/auth';
import { SetPasswordFormValues } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

interface EmailFormProps {
  onSubmit: () => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const { mutate: requestEmail, isPending } = useRequestEmail({
    onSuccess: () => {
      onSubmit();
    },
    onError: error => {
      if (error.code === 'C018') {
        alert('이메일 전송에 실패하였습니다');
        return;
      }

      if (error.code === 'C009' || error.code === 'C005') {
        form.setError('email', { message: '존재하지 않는 회원입니다' });
        return;
      }

      alert('초기화 링크 생성에 실패하였습니다');
    },
  });

  const handleSubmit = (data: SetPasswordFormValues) => {
    requestEmail(data);
  };
  return (
    <View className="flex w-full max-w-md flex-col gap-8 p-2">
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
        isLoading={isPending}
        loadingText="링크 생성 중"
        onPress={form.handleSubmit(handleSubmit)}
      >
        <Text className="text-background">링크 생성하기</Text>
      </LoadingButton>
    </View>
  );
}

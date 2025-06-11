import { Button, Input, Label, Sheet, SheetContent, SheetTrigger } from '@/components/ui';
import { useLogin } from '@/hooks/useMutation/useLogin';
import { loginSchema } from '@/schemas/auth';
import { LoginRequest } from '@/types/auth';
import { mergeRefs } from '@/utils/mergeRefs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import KakaoLoginWebView from './KakaoLoginWebView';

export default function LoginForm() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

  const { mutate: login } = useLogin();

  const { control, formState, clearErrors, handleSubmit } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmitForm = (data: LoginRequest) => {
    login(data);
  };

  const handleCloseSheet = () => {
    setIsOpenSheet(false);
  };

  /* const handleKakaoLogin = async () => {
    const redirectUri = `https://front.jungmoserver.shop/login/oauth2/mobile`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.EXPO_PUBLIC_KAKAO_API_KEY}&redirect_uri=${redirectUri}`;
    await Linking.openURL(kakaoAuthUrl);
  }; */

  return (
    <View className="flex w-full max-w-96 flex-col gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field: { ref, ...fields } }) => (
          <View>
            <View className="mb-2">
              <Label>이메일</Label>
            </View>
            <Input
              ref={mergeRefs(ref, emailRef)}
              placeholder="이메일을 입력해주세요"
              error={Boolean(formState.errors.email)}
              clearError={() => clearErrors('email')}
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              {...fields}
              className="h-12 border-gray-200 bg-gray-100 px-4"
            />
            <Text className="ml-1 text-red-500">{formState.errors.email?.message}</Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { ref, ...fields } }) => (
          <View>
            <View className="mb-2">
              <Label>비밀번호</Label>
            </View>
            <Input
              secureTextEntry
              ref={mergeRefs(ref, passwordRef)}
              autoComplete="password"
              placeholder="이메일을 입력해주세요"
              returnKeyType="done"
              blurOnSubmit={false}
              error={Boolean(formState.errors.password)}
              clearError={() => clearErrors('password')}
              onSubmitEditing={() => {
                handleSubmit(handleSubmitForm)();
                if (!formState.isValid) {
                  passwordRef.current?.focus();
                }
              }}
              {...fields}
              className="h-12 border-gray-200 bg-gray-100 px-4"
            />
            <Text className="ml-1 text-red-500">{formState.errors.password?.message}</Text>
          </View>
        )}
      />
      <View>
        <Button
          title="로그인"
          titleClassName="font-semibold test-white"
          className="h-12 w-full"
          disabled={!formState.isValid}
          onPress={handleSubmit(handleSubmitForm)}
        />
        <View className="relative mb-3 mt-4">
          <View className="flex absolute inset-0 items-center">
            <View className="w-full border-t border-gray-200" />
          </View>
          <View className="flex relative justify-center text-xs uppercase">
            <Text className="bg-background px-2 text-muted-foreground">OR</Text>
          </View>
        </View>
        <Sheet isOpen={isOpenSheet} onOpenChange={setIsOpenSheet}>
          <SheetTrigger>
            <Button
              className="h-12 w-full bg-yellow-400 font-semibold active:bg-yellow-500"
              titleClassName="text-black"
              title="카카오로 로그인하기"
            />
          </SheetTrigger>
          <SheetContent size="100%" className="rounded-none">
            <KakaoLoginWebView onClose={handleCloseSheet} />
          </SheetContent>
        </Sheet>
      </View>
    </View>
  );
}

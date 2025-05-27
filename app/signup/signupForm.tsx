import { Button, Input, Label } from '@/components/ui';
import { signupSchema } from '@/schemas/auth';
import { SignupFormValues } from '@/types/auth';
import { mergeRefs } from '@/utils/mergeRefs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

export default function SignupForm() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const { control, formState, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmitForm = (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <View className="flex flex-col gap-2">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <View className="flex flex-col gap-1">
            <Label>이름</Label>
            <Input
              placeholder="이름을 입력해주세요"
              className="h-12 border-gray-200 bg-gray-100 px-4"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              {...field}
            />
            <Text className="-mt-1 mb-1 ml-1 text-red-500">{formState.errors.name?.message}</Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { ref, ...fields } }) => (
          <View className="flex flex-col gap-1">
            <Label>이메일</Label>
            <Input
              ref={mergeRefs(ref, emailRef)}
              placeholder="이메일을 입력해주세요"
              className="h-12 border-gray-200 bg-gray-100 px-4"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              {...fields}
            />
            <Text className="-mt-1 mb-1 ml-1 text-red-500">{formState.errors.email?.message}</Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { ref, ...fields } }) => (
          <View className="flex flex-col gap-1">
            <Label>비밀번호</Label>
            <Input
              secureTextEntry
              ref={mergeRefs(ref, passwordRef)}
              placeholder="비밀번호를 입력해주세요"
              className="h-12 border-gray-200 bg-gray-100 px-4"
              returnKeyType="done"
              onSubmitEditing={() => {
                handleSubmit(handleSubmitForm)();
                if (!formState.isValid) {
                  passwordRef.current?.focus();
                }
              }}
              {...fields}
            />
            <Text className="-mt-1 mb-1 ml-1 text-red-500">{formState.errors.password?.message}</Text>
          </View>
        )}
      />
      <Button
        className="mt-6 h-12 w-full"
        titleClassName="font-semibold text-white"
        disabled={!formState.isValid}
        title="회원가입"
      />
    </View>
  );
}

'use client';

import ImageSelectModal from '@/components/modals/ImageSelectModal';
import { Avatar, AvatarFallback, AvatarImage, Button, Card, Input, Label } from '@/components/ui';
import { ButtonContext } from '@/context/ButtonPressContext';
import { useImagePicker } from '@/hooks/useImagePicker';
import { useEditAccount } from '@/hooks/useMutation/useEditAccount';
import { EditProfileFormValues, editProfileSchema } from '@/schemas/auth';
import { UserInfoResponse } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Clipboard from 'expo-clipboard';
import { Copy, Edit, Save, X } from 'lucide-react-native';
import { useContext, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Dimensions, Text, TextInput, View } from 'react-native';

interface InfoFormProps {
  userData: UserInfoResponse | undefined;
}

export default function InfoForm({ userData }: InfoFormProps) {
  const inputRef = useRef<TextInput | null>(null);

  const { isPressed } = useContext(ButtonContext);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditImage, setIsEditImage] = useState(false);
  const { imageFiles, imageUris, imageError, uploadImageFiles, uploadTakingPicture, imageReset } = useImagePicker(
    userData?.profileImage ?? null
  );

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      userName: userData?.userName ?? '',
      profileImage: undefined,
    },
    mode: 'onChange',
  });

  const { mutate: editAccount, isPending } = useEditAccount({
    onSuccess: () => {
      setIsEditMode(false);
    },
    onError: () => {
      imageReset();
      form.reset();
    },
  });

  if (!userData) {
    throw new Error('userData is undefined');
  }

  const onSubmit = async (data: EditProfileFormValues) => {
    editAccount({ ...data, profileImage: imageFiles[0], preview: imageUris[0] ?? '' });
  };

  const handlePressEditButton = () => {
    setIsEditMode(true);
  };

  const handlePressCancelButton = () => {
    setIsEditMode(false);
    if (inputRef.current) {
      inputRef.current.setNativeProps({ text: '' });
    }
    form.reset({ userName: userData?.userName ?? '', profileImage: undefined });
    imageReset();
  };

  const handlePressCopyButton = async () => {
    try {
      await Clipboard.setStringAsync(userData?.userCode ?? '');
      alert('클립보드에 복사하였습니다.');
    } catch {
      alert('클립보드 복사에 실패하였습니다');
    }
  };
  return (
    <FormProvider {...form}>
      <Card className="flex relative mx-4 flex-col gap-8 pb-4 pt-8">
        {isEditMode ? (
          <View className="flex absolute right-3 top-3 items-center gap-2">
            <Button
              variant="ghost"
              size="none"
              className="group select-none p-0"
              aria-label="저장"
              disabled={isPending}
              onPress={form.handleSubmit(onSubmit)}
            >
              <Save size={22} color="gray" />
            </Button>
            <Button
              variant="ghost"
              size="none"
              className="group select-none p-0"
              aria-label="취소"
              onPress={handlePressCancelButton}
            >
              <X size={22} color="gray" />
            </Button>
          </View>
        ) : (
          <Button
            variant="ghost"
            size="none"
            className="group absolute right-3 top-3 select-none p-0"
            aria-label="편집"
            disabled={isPressed}
            onPress={handlePressEditButton}
          >
            <Edit size={22} color="gray" className="group-hover:stroke-neutral-500" />
          </Button>
        )}
        <View className="flex flex-col items-center space-y-4">
          <View className="relative">
            <Avatar size={Dimensions.get('window').height * 0.15} className="parent">
              <AvatarImage src={imageUris.length ? imageUris[0] : null} />
              <AvatarFallback fallback={form.watch('userName')} />
            </Avatar>
            {isEditMode && (
              <Button
                className="absolute left-0 top-0 select-none rounded-full bg-shadow-30 active:bg-shadow-50"
                size="none"
                aria-label="변경"
                style={{
                  width: Dimensions.get('window').height * 0.15,
                  height: Dimensions.get('window').height * 0.15,
                }}
                onPress={() => setIsEditImage(true)}
              >
                <Text className="text-xl text-white-shadow-70">변경</Text>
              </Button>
            )}
          </View>
          {imageError && <Text className="text-sm text-destructive">{imageError}</Text>}
        </View>

        <Card className="space-y-4 rounded-2xl bg-background p-4">
          <Label>이름</Label>
          <Controller
            control={form.control}
            name="userName"
            render={({ field }) => (
              <Input
                {...field}
                readOnly={!isEditMode}
                className={`bg-background ${!isEditMode && 'cursor-default'} mt-2`}
                placeholder="이름을 입력해주세요"
              />
            )}
          />
        </Card>

        <Card className="space-y-4 rounded-2xl bg-background p-4">
          <Label>유저 코드</Label>
          <Button
            className="mt-2 w-full justify-normal border border-input bg-background px-2"
            variant="ghost"
            aria-label="유저코드 복사"
            onPress={handlePressCopyButton}
          >
            <View className="flex items-center gap-2">
              <Copy size={16} color="gray" />
              <Text>{userData?.userCode}</Text>
            </View>
          </Button>
        </Card>
      </Card>
      <ImageSelectModal
        isOpen={isEditImage}
        onClose={setIsEditImage}
        onPressCamera={uploadTakingPicture}
        onPressFile={uploadImageFiles}
      />
    </FormProvider>
  );
}

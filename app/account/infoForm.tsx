'use client';

import ImageSelectModal from '@/components/modals/ImageSelectModal';
import { Avatar, AvatarFallback, AvatarImage, Button, Card, Input, Label } from '@/components/ui';
import { useImagePicker } from '@/hooks/useImagePicker';
import { EditProfileFormValues, editProfileSchema } from '@/schemas/auth';
import { UserInfoResponse } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Edit, Save, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';

export default function InfoForm() {
  const userData: UserInfoResponse = {
    userId: 1,
    userCode: 'CODE',
    userName: 'TEST',
    profileImage: null,
    provider: 'email',
  };
  const inputRef = useRef<TextInput | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditImage, setIsEditImage] = useState(false);
  const { imageFiles, imageUris, imageError, uploadImageFiles, uploadTakingPicture, imageReset } = useImagePicker(
    userData.profileImage,
    1
  );

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      userName: userData?.userName ?? '',
      profileImage: undefined,
    },
    mode: 'onChange',
  });

  /* useEffect(() => {
    if (!userData) {
      router.push(`/login?date=${Date.now()}`);
    }
  }, [userData]); */

  const editAccount = (payload: EditProfileFormValues) => {
    console.log(payload);
  };

  const isPending = false;

  if (!userData) {
    return (
      <View className="flex size-full flex-grow items-center justify-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const onSubmit = async (data: EditProfileFormValues) => {
    editAccount({ ...data, profileImage: imageFiles[0] });
  };

  const handleClickEditButton = () => {
    setIsEditMode(true);
  };

  const handleClickCancelButton = () => {
    setIsEditMode(false);
    if (inputRef.current) {
      inputRef.current.setNativeProps({ text: '' });
    }
    form.reset({ userName: userData?.userName ?? '', profileImage: undefined });
    imageReset();
  };

  const handleClickCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(userData?.userCode ?? '');
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
              onPress={handleClickCancelButton}
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
            onPress={handleClickEditButton}
          >
            <Edit size={22} color="gray" className="group-hover:stroke-neutral-500" />
          </Button>
        )}
        <View className="flex flex-col items-center space-y-4">
          <View className="relative">
            <Avatar size={124} className="parent">
              <AvatarImage src={imageUris.length ? imageUris[0] : null} />
              <AvatarFallback fallback={form.watch('userName')} />
            </Avatar>
            {isEditMode && (
              <Button
                className="bg-shadow-30 active:bg-shadow-50 absolute left-0 top-0 size-[124px] select-none rounded-full"
                size="none"
                aria-label="변경"
                onPress={() => setIsEditImage(true)}
              >
                <Text className="text-white-shadow-70 text-xl">변경</Text>
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
            onPress={handleClickCopyButton}
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
        onClickCamera={uploadTakingPicture}
        onClickFile={uploadImageFiles}
      />
    </FormProvider>
  );
}

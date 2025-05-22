'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui';
import { UserDataResponse, UserInfoResponse } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';
import { Search, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';

interface AttendeeSelectModalProps {
  isOpen: boolean;
  value?: UserDataResponse[];
  onClose: () => void;
  onSelect: (selectedUsers: UserDataResponse[]) => void;
}

interface IFormInput {
  inputValue: string;
}

export default function AttendeeSelectModal({ isOpen, value, onClose, onSelect }: AttendeeSelectModalProps) {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserInfoResponse>(['userData']);

  const { control, setValue, watch, reset } = useForm<IFormInput>();
  const inputValue = watch('inputValue') as string;

  /* const { value: debouncedKeyword } = useDebouncedValue(inputValue, 200); */
  const [selectedUsers, setSelectedUsers] = useState<UserDataResponse[]>(value ?? []);

  const [searchList] = useState<UserDataResponse[]>([]); // debouncedKeyword

  const isPending = false;
  const isError = false;

  const searchResult = useMemo(() => {
    const selectedCodes = new Set(selectedUsers.map(user => user.userCode));
    return searchList.filter(user => !selectedCodes.has(user.userCode));
  }, [searchList, selectedUsers]);

  const handleUserSelect = (newUser: UserDataResponse) => {
    setSelectedUsers(prev => [...prev.filter(user => user.userId !== newUser.userId), newUser]);
  };

  const handleUserRemove = (userId: number) => {
    setSelectedUsers(prev => prev.filter(user => user.userId !== userId));
  };

  const handleConfirm = () => {
    onSelect(selectedUsers);
    setValue('inputValue', '');
    onClose();
  };

  const handleClose = () => {
    setSelectedUsers(value ?? []);
    setValue('inputValue', '');
    onClose();
  };

  const handleCancle = () => {
    reset();
    handleClose();
  };

  const SearchResultComponent = () => {
    const renderMessage = (message: string) => (
      <View className="flex mt-4 w-full flex-1 items-center justify-center">
        <Text className="text-muted-foreground">{message}</Text>
      </View>
    );

    if (!inputValue) {
      return renderMessage('검색어를 입력해주세요');
    }

    if (isPending) {
      return renderMessage('검색 중...');
    }
    if (isError) {
      return renderMessage('검색 결과를 불러올 수 없습니다');
    }

    if (searchResult.length > 0) {
      return (
        <ScrollView className="flex-1">
          <View className="flex flex-col gap-1 space-y-2">
            {searchResult.map(user => (
              <Button
                key={user.userId}
                variant="ghost"
                className="w-full gap-2"
                style={{ justifyContent: 'flex-start' }}
                aria-label="사용자 선택"
                onPress={() => handleUserSelect(user)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback fallback={user.userName[0]} />
                </Avatar>
                <View className="text-left">
                  <Text className="font-medium">{user.userName}</Text>
                </View>
              </Button>
            ))}
          </View>
        </ScrollView>
      );
    }

    return renderMessage('해당 키워드로 검색된 사용자가 없습니다');
  };

  return (
    <Sheet isOpen={isOpen} onOpenChange={handleClose}>
      <SheetContent position="bottom" className="w-full flex-1 flex-col" size="60%">
        <SheetHeader className="mb-2">
          <SheetTitle>참석자 추가</SheetTitle>
        </SheetHeader>

        <View className="flex flex-1 flex-col gap-4">
          {selectedUsers.length > 0 && (
            <ScrollView horizontal className="p-0" style={{ flexDirection: 'row', flexGrow: 0 }}>
              <View className="flex flex-wrap gap-2 p-2">
                {selectedUsers.map(user => (
                  <Button
                    key={user.userId}
                    variant="ghost"
                    size="none"
                    className="p-0"
                    aria-label="닫기"
                    onPress={() => handleUserRemove(user.userId)}
                  >
                    <View className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1">
                      <Avatar size={20}>
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback fallback={user.userName?.[0] ?? ''} />
                      </Avatar>
                      <Text className="text-sm">{user.userName}</Text>
                      {userData?.userCode !== user.userCode && <X size={12} color="black" />}
                    </View>
                  </Button>
                ))}
              </View>
            </ScrollView>
          )}

          {/* 검색 입력창 */}
          <View className="relative w-full px-2 pb-3 pt-1">
            <View className="absolute left-4 top-[13px] z-10">
              <Search size={16} color="black" />
            </View>
            <Controller
              control={control}
              name="inputValue"
              render={({ field }) => (
                <Input placeholder="사용자 코드로 검색" className="relative border bg-background pl-8" {...field} />
              )}
            />
          </View>

          <SearchResultComponent />

          <View className="flex justify-end gap-2">
            <Button title="확인" onPress={handleConfirm} />
            <Button variant="outline" aria-label="취소" title="취소" onPress={handleCancle} />
          </View>
        </View>
      </SheetContent>
    </Sheet>
  );
}

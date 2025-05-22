import DatePickerSheet from '@/components/datePickerSheet';
import AttendeeSelectModal from '@/components/modals/attendeeSelectModal';
import TimePickerSheet from '@/components/timePickerSheet';
import { Avatar, AvatarImage, Button, Input, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { mainInfoSchema } from '@/schemas/appointment';
import { MainInfoValue } from '@/types/appointment';
import { UserDataResponse } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Calendar, LucideFileTerminal, PenLine, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function MainInfo() {
  const { id } = useLocalSearchParams();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenSelectModal, setIsOpenSelectModal] = useState(false);

  const appointment = {
    authority: 'WRITE',
    id: Number(id),
    title: 'test',
    startDate: '2025-05-22',
    endDate: '2025-05-22',
    startTime: '14:45',
    memo: '',
    gatheringUsers: [
      {
        userId: 2,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 3,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 4,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 5,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 6,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
      {
        userId: 7,
        userCode: 'C1A8MZ',
        userName: 'test11',
        profileImage:
          'https://jungmobucket.s3.amazonaws.com/profile-images/2/e927b6ba-8792-4baf-ae2a-83dad77931e7-10101139-샘플-우표.jpg',
      },
    ],
    meetingLocation: {
      placeId: 'ChIJR2AS3cyhfDUR4LnI13dxb5k',
      placeName: '스타벅스 국기원사거리점',
      placeAddress: '대한민국 서울특별시 강남구 테헤란로 125 동찬빌딩',
      point: {
        location: {
          lat: 37.4995995,
          lng: 127.0316606,
        },
        viewport: {
          northeast: { lat: 37.5009484802915, lng: 127.0330095802915 },
          southwest: { lat: 37.4982505197085, lng: 127.0303116197085 },
        },
      },
    },
    location: [],
  };

  const { control, getValues, reset, setValue, handleSubmit, formState } = useForm({
    resolver: zodResolver(mainInfoSchema),
    defaultValues: {
      title: appointment?.title ?? '',
      startDate: appointment?.startDate ?? '',
      startTime: appointment?.startTime ?? '',
      description: appointment?.memo ?? '',
      userList: appointment?.gatheringUsers ?? [],
    },
    mode: 'onChange',
  });

  const isEditable = appointment.authority === 'WRITE';
  const visibleParticipants = getValues('userList').slice(0, 3);
  const remainingCount = getValues('userList').length - 3;

  const handleClickSaveButton = (payload: MainInfoValue) => {
    console.log(payload);
  };

  const handleClickCancleButton = () => {
    setIsEditMode(false);
    if (appointment) {
      reset();
    }
  };

  const handleClickEditButton = () => {
    setIsEditMode(true);
  };

  const handleSelectDate = (value: Date) => {
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');

    setValue('startDate', `${year}-${month}-${day}`);
  };

  const handleSelectTime = (time: Record<'hours' | 'minutes', number>) => {
    setValue('startTime', `${time.hours}:${time.minutes}`);
  };

  const handleClickSettingAttendeeButton = () => {
    if (!isEditMode) {
      return;
    }
    setIsOpenSelectModal(true);
  };

  const handleChangeAttendee = (attendees: UserDataResponse[]) => {
    setValue('userList', attendees);
  };

  return (
    <View className="w-full rounded-2xl">
      <View className="flex flex-col gap-3 space-y-2">
        <View className="flex w-full items-center justify-between gap-2">
          <View className="flex flex-1 items-center gap-2 overflow-hidden">
            <LucideFileTerminal className="mr-2 h-4 w-4 flex-shrink-0" color="#6B7280" />
            {isEditMode ? (
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    className="h-7 flex-1 rounded-sm px-3 py-0 text-base font-semibold"
                    {...field}
                    placeholder="일정 제목을 입력해주세요"
                  />
                )}
              />
            ) : (
              <View className="flex h-7 items-center">
                <Text className="truncate text-xl font-semibold">{appointment.title}</Text>
              </View>
            )}
          </View>

          {isEditable && (
            <View className="flex flex-shrink-0 items-center gap-2">
              {isEditMode ? (
                <>
                  <Button
                    variant="outline"
                    className={`h-[22px] w-[44px] rounded-full p-0 ${formState.isValid ? 'bg-green-500 active:bg-green-600' : 'bg-gray-300 active:bg-gray-300'} `}
                    title="저장"
                    titleClassName="text-white"
                    onPress={handleSubmit(handleClickSaveButton)}
                  />

                  <Button
                    variant="outline"
                    className="h-[22px] w-[44px] rounded-full bg-red-500 p-0 active:bg-red-600"
                    title="취소"
                    titleClassName="text-white"
                    onPress={handleClickCancleButton}
                  />
                </>
              ) : (
                <Button
                  variant="outline"
                  className="active h-[22px] w-[44px] rounded-full bg-gray-200 p-0 active:bg-gray-300"
                  title="편집"
                  onPress={handleClickEditButton}
                />
              )}
            </View>
          )}
        </View>
        <View className={`flex items-center gap-2 text-sm text-gray-500 ${isEditMode && 'cursor-pointer'}`}>
          <Calendar className="mr-2 h-4 w-4" color="gray" />
          {isEditMode ? (
            <View className="flex items-center gap-1">
              <DatePickerSheet
                classNames="h-7 p-0"
                value={new Date(getValues('startDate'))}
                onSelect={handleSelectDate}
              />
              <TimePickerSheet classNames="h-7 p-0" value={getValues('startTime')} onSelect={handleSelectTime} />
            </View>
          ) : (
            <Text className="text-lg">{`${appointment.startDate} ${appointment.startTime}`}</Text>
          )}
        </View>
        <View className="flex gap-2 text-sm text-gray-500">
          <PenLine className="mr-2 mt-1 h-4 w-4" color="gray" />
          <View className="flex-grow">
            {isEditMode ? (
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    multiline
                    isHeightChange
                    minHeight={64}
                    placeholder="일정에 대한 설명을 입력해주세요"
                    className="bg-background text-sm"
                    {...field}
                  />
                )}
              />
            ) : (
              <View className="flex-shrink whitespace-pre-line break-all">{appointment.memo}</View>
            )}
          </View>
        </View>
        <View className="flex justify-between">
          <View className="flex">
            {visibleParticipants.map(participant => (
              <View key={participant.userId} className="group relative">
                <Popover position="top">
                  <PopoverTrigger>
                    <Avatar className="relative h-8 w-8 border border-gray-50">
                      <AvatarImage src={participant.profileImage} alt={participant.userName} />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent>
                    <View className="max-w-52 rounded-xl border border-gray-300 bg-background px-2">
                      <Text className="text-nowrap text-lg font-bold" numberOfLines={1} style={{ flexWrap: 'wrap' }}>
                        {participant.userName}
                      </Text>
                    </View>
                  </PopoverContent>
                </Popover>
              </View>
            ))}
            {remainingCount > 0 && (
              <View className="flex size-12 items-center justify-center rounded-full border-2 border-background bg-gray-100">
                <Text className="text-sm text-gray-600">+{remainingCount}</Text>
              </View>
            )}
          </View>
          {isEditMode && (
            <View className="flex items-center justify-center">
              <Button
                className="size-[34px] select-none rounded-full border-2 border-background bg-neutral-200 active:bg-neutral-300"
                onPress={handleClickSettingAttendeeButton}
              >
                <Settings size={16} color="white" />
              </Button>
            </View>
          )}
        </View>
      </View>
      <AttendeeSelectModal
        isOpen={isOpenSelectModal}
        value={getValues('userList')}
        onClose={() => setIsOpenSelectModal(false)}
        onSelect={handleChangeAttendee}
      />
    </View>
  );
}

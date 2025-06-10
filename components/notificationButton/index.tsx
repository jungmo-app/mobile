import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { useDeleteNotification } from '@/hooks/useMutation/useDeleteNotification';
import { useNotification } from '@/hooks/useQuery/useNotification';
import { NotificationType } from '@/types/notification';
import { Bell } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import GroupNotification from './groupNotification';
import Notification from './notification';

export default function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notification } = useNotification();
  const { mutate: deleteNotification } = useDeleteNotification();

  const groupNotification = Object.values(
    (notification ?? []).reduce(
      (acc, noti) => {
        (acc[noti.gatheringId] ??= []).push(noti);
        return acc;
      },
      {} as Record<number, NotificationType[]>
    )
  ).sort((a, b) => new Date(b[0].createdAt).getTime() - new Date(a[0].createdAt).getTime());

  const unReadCount = notification?.filter(item => !item.read).length ?? 0;

  const handleClickDeleteAllButton = async () => {
    const notificationIdList = (notification ?? [])?.map(item => item.notificationId);
    deleteNotification(notificationIdList);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <View className="relative">
          <Bell size={24} color="gray" />
          {unReadCount > 0 && (
            <View className="flex absolute -top-1 right-0 size-[14px] cursor-pointer items-center justify-center rounded-full bg-red-600">
              <Text className={`${unReadCount > 99 ? 'text-[8px]' : 'text-[10px]'} text-white`}>
                {unReadCount > 99 ? '99+' : unReadCount}
              </Text>
            </View>
          )}
        </View>
      </PopoverTrigger>
      <PopoverContent>
        {notification ? (
          <View className="max-h-96 w-[300px] p-2">
            <View className="flex my-2 items-center justify-between px-4">
              <Text className="text-xl font-semibold">{`알림 ${notification?.length}개`}</Text>
            </View>
            {groupNotification?.length > 0 ? (
              <ScrollView
                className="mb-6 w-full flex-col gap-2 text-sm"
                contentContainerStyle={{ padding: 4, alignItems: 'center' }}
              >
                {groupNotification?.map(item =>
                  item.length > 1 ? (
                    <GroupNotification
                      key={`appointment-${item[0].gatheringId}`}
                      notification={item}
                      onClose={handleClose}
                    />
                  ) : (
                    <Notification
                      key={`notification-${item[0].notificationId}`}
                      notification={item[0]}
                      onClose={handleClose}
                    />
                  )
                )}
              </ScrollView>
            ) : (
              <View className="flex h-56 w-full items-center justify-center">
                <Text className="text-sm text-gray-500">알림이 없습니다</Text>
              </View>
            )}
            {notification?.length > 0 && (
              <Button
                className="absolute bottom-2 right-5 select-none px-2 py-1"
                titleClassName="text-gray-400 text-xs"
                size="none"
                variant="ghost"
                title="전체 지우기"
                onPress={handleClickDeleteAllButton}
              />
            )}
          </View>
        ) : (
          <View>
            <Text>알림을 불러올 수 없습니다</Text>
          </View>
        )}
      </PopoverContent>
    </Popover>
  );
}

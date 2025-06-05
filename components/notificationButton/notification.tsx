import { Button } from '@/components/ui';
import { NotificationType } from '@/types/notification';
import { getTimeline, parseKST } from '@/utils/date';
import { clsx } from 'clsx';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { GestureResponderEvent, Image, Pressable, Text, View } from 'react-native';
import { SwipeableNotification } from './swipeableNotification';

interface NotificationProps {
  notification: NotificationType;
}

export default function Notification({ notification }: NotificationProps) {
  const router = useRouter();

  const { notificationId, gatheringId, read: isRead } = notification;

  const handleClickNotification = async () => {
    if (!isRead) {
      console.log(notificationId);
      return;
    }
    router.push(`/appointment/${gatheringId}`);
  };

  const handleClickDeleteButton = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    console.log([notificationId]);
  };

  return (
    <SwipeableNotification id={[notificationId]} onDelete={(id: number[]) => console.log(id)}>
      <Pressable className="group relative w-full cursor-pointer" onPress={handleClickNotification}>
        <Button
          className="flex invisible absolute right-2 top-2 z-10 select-none items-center justify-center rounded-full p-[2px] hover:bg-gray-100 group-hover:visible dark:hover:bg-gray-700"
          disabled={false}
          size="none"
          variant="ghost"
          onPress={handleClickDeleteButton}
        >
          <X className="size-[14px]" />
        </Button>

        <View
          className={clsx(
            'dark:border-gray-600, flex relative w-full items-center gap-3 rounded-lg border border-gray-300 bg-background p-3 text-left shadow-sm hover:shadow-md',
            isRead && 'opacity-50'
          )}
        >
          <View className="flex relative size-7 items-center justify-center gap-2">
            <Image
              alt="image"
              className="size-7 rounded-full"
              source={
                typeof notification.profileImage === 'string'
                  ? { uri: notification.profileImage }
                  : require('@/assets/images/sample.jpg')
              }
            />
          </View>
          <View className="flex flex-1 flex-col justify-between overflow-hidden">
            <View className="flex w-full items-center justify-between">
              <View className="flex w-full max-w-36 flex-shrink items-center gap-2">
                <Text className="text-xs font-semibold" numberOfLines={1} ellipsizeMode="tail">
                  {notification.title}
                </Text>
                <Text className="flex-shrink-0 self-end text-[10px] text-gray-400">
                  {getTimeline(parseKST(new Date(notification.createdAt)))}
                </Text>
              </View>
            </View>

            <Text className="mt-0.5 line-clamp-2 max-h-8 w-full break-words text-xs text-gray-700 dark:text-gray-400">
              {notification.message}
            </Text>
          </View>
        </View>
      </Pressable>
    </SwipeableNotification>
  );
}

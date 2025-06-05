import { NotificationType } from '@/types/notification';
import { getTimeline, parseKST } from '@/utils/date';
import { clsx } from 'clsx';
import { ChevronDown, ChevronUp, X } from 'lucide-react-native';
import { useState } from 'react';
import { GestureResponderEvent, Image, Pressable, Text, View } from 'react-native';
import { Button } from '../ui';
import Notification from './notification';
import { SwipeableNotification } from './swipeableNotification';

interface GroupNotificationProps {
  notification: NotificationType[];
}

export default function GroupNotification({ notification }: GroupNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const notificationId = notification.map(item => item.notificationId);

  const handleClickDeleteButton = () => {
    console.log(notificationId);
  };

  const handleClickNotification = () => {
    const unreadId = notification.filter(noti => !noti.read).map(noti => noti.notificationId);
    console.log(unreadId);
  };

  const isRead = notification.every(item => item.read === true);

  const handleButtonClick = (e: GestureResponderEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const RenderExpanded = () => {
    return (
      <View className="mb-2 w-full rounded-lg bg-gray-50 pb-[10px] pt-[2px]">
        <View className="flex mb-1 mt-2 items-center justify-between px-2">
          <View className="flex-1">
            <Text className="font-semibold" numberOfLines={1} ellipsizeMode="tail">
              {notification[0].title}
            </Text>
          </View>

          <View className="flex flex-shrink-0 items-center gap-2">
            <Button
              className="flex select-none items-center justify-center rounded-full p-[2px] hover:bg-gray-100 dark:hover:bg-gray-700"
              size="none"
              variant="ghost"
              onPress={handleButtonClick}
            >
              <ChevronUp size={16} color="#9ca3af" />
            </Button>

            <Button
              className="flex select-none items-center justify-center rounded-full p-[2px] pl-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              size="none"
              variant="ghost"
              onPress={handleClickDeleteButton}
            >
              <X size={16} color="#9ca3af" />
            </Button>
          </View>
        </View>
        <View className="flex flex-col gap-2">
          {notification.map(noti => (
            <Notification key={`notification-${noti.notificationId}`} notification={noti} />
          ))}
        </View>
      </View>
    );
  };

  const RenderCollapsed = () => {
    return (
      <Pressable
        className={clsx(
          'dark:border-gray-600, flex relative w-full items-center gap-3 rounded-lg border border-gray-300 bg-background p-3 text-left shadow-sm hover:shadow-md',
          isRead && 'opacity-50'
        )}
        onPress={handleClickNotification}
      >
        <Button
          className="group flex absolute right-2 top-3 z-50 w-10 flex-shrink-0 items-center px-1"
          size="none"
          variant="ghost"
          onPress={handleButtonClick}
        >
          <View>
            <Text className="text-[10px] text-gray-400">{notification.length > 99 ? '99+' : notification.length}</Text>
          </View>

          <ChevronDown
            color="#9ca3af"
            size={16}
            className="size-4 stroke-gray-400 group-hover:stroke-gray-600 group-hover:dark:stroke-gray-300"
          />
        </Button>
        <View className="flex relative size-7 items-center justify-center gap-2">
          <Image
            alt="image"
            className="size-7 rounded-full"
            source={
              typeof notification[0].profileImage === 'string'
                ? { uri: notification[0].profileImage }
                : require('@/assets/images/sample.jpg')
            }
          />
        </View>
        <View className="flex flex-1 flex-col justify-between overflow-hidden">
          <View className="flex w-full items-center justify-between">
            <View className="flex w-full max-w-36 flex-shrink items-center gap-2">
              <Text className="text-xs font-semibold" numberOfLines={1} ellipsizeMode="tail">
                {notification[0].title}
              </Text>
              <Text className="flex-shrink-0 self-end text-[10px] text-gray-400">
                {getTimeline(parseKST(new Date(notification[0].createdAt)))}
              </Text>
            </View>
          </View>

          <Text className="mt-0.5 line-clamp-2 max-h-8 w-full break-words text-xs text-gray-700 dark:text-gray-400">
            {notification[0].message}
          </Text>
          <Text className="mt-0.5 line-clamp-2 max-h-8 w-full break-words text-xs text-gray-700 dark:text-gray-400">
            {notification[1].message}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      {isOpen ? (
        <RenderExpanded />
      ) : (
        <SwipeableNotification id={notificationId} onDelete={(id: number[]) => console.log(id)}>
          <RenderCollapsed />
        </SwipeableNotification>
      )}
    </>
  );
}

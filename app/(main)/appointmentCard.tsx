import { GatheringListResponse } from '@/types/gathering';
import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';

interface AppointmentCardProps {
  appointment: GatheringListResponse;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <Link href="/account">
      <View className="flex items-center gap-4 p-2">
        <View className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            className="size-full"
            source={
              typeof appointment.profileImage === 'string'
                ? { uri: appointment.profileImage }
                : require('@/assets/images/sample.jpg')
            }
          />
        </View>
        <View className="flex-1 overflow-hidden">
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-lg font-medium">
            {appointment.title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="truncate text-sm text-muted-foreground"
          >{`${appointment.startDate} ${appointment.startTime}`}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" className="block w-full truncate text-sm text-muted-foreground">
            location
          </Text>
        </View>
      </View>
    </Link>
  );
}

import LocationSettingModal from '@/components/modals/locationSettingModal';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { appointmentData } from '@/constants/mock';
import { useDeleteLocation } from '@/hooks/useMutation/useDeleteLocation';
import { Photos, PlaceSearchResult } from '@/types/map';
import { getDistance } from '@/utils/map';
import { useLocalSearchParams } from 'expo-router';
import { MapPin, MoreVertical } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { GestureResponderEvent, Image, Pressable, Text, View } from 'react-native';

interface VisitPlaceProps {
  place: Omit<PlaceSearchResult, 'id'> & Record<'id', number>;
}

export default function VisitPlace({ place }: VisitPlaceProps) {
  const { id } = useLocalSearchParams();

  const { mutate: deleteLocation, isPending: isPendingDeleteLocation } = useDeleteLocation(Number(id));

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  const appointment = appointmentData(id as string);

  const handlePressWrapper = () => {
    setIsOpenModal(true);
  };

  const handleClosePlaceModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleOpenPopover = (value: boolean) => {
    setIsOpenSetting(value);
  };

  const handleDeleteLocation = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (!place.id) {
      return;
    }
    setIsOpenSetting(false);
    deleteLocation(place.id);
  };

  if (!appointment) {
    return;
  }

  const distance = getDistance(
    appointment.meetingLocation.point?.location?.lat as unknown as number,
    appointment.meetingLocation.point?.location?.lng as unknown as number,
    place.geometry?.location?.lat as unknown as number,
    place.geometry?.location?.lng as unknown as number
  );

  const isEditable = appointment.authority === 'WRITE';

  return (
    <>
      <Pressable className="cursor-pointer rounded-2xl p-4" onPress={handlePressWrapper}>
        <View className="flex items-center justify-between gap-4">
          <View className="flex flex-shrink items-center gap-3">
            <View
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${place.icon_background_color}`}
            >
              <MapPin className="h-5 w-5" color="black" />
            </View>
            <View className="min-w-0">
              <View className="flex mb-1 items-center gap-2">
                <Text className="text-xl font-medium" numberOfLines={1} ellipsizeMode="tail">
                  {place.name ?? ''}
                </Text>

                {place.types && (
                  <View className="flex-shrink-0 rounded-md bg-gray-200 px-3 py-[2px] font-bold">
                    <Text>{place?.types[0]}</Text>
                  </View>
                )}
              </View>
              <View className="text-sm text-gray-500">
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {distance && `${distance[0]} ${distance[1]} • `} {place.formatted_address ?? ''}
                </Text>
              </View>
            </View>
          </View>
          {isEditable && (
            <Popover isOpen={isOpenSetting} onOpenChange={handleOpenPopover}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="더보기">
                  <MoreVertical size={16} color="black" />
                </Button>
              </PopoverTrigger>
              <PopoverContent height={48} width={144}>
                <View className="flex h-12 w-36 items-center justify-center p-0 text-sm">
                  <Button
                    variant="ghost"
                    aria-label="삭제"
                    title="삭제하기"
                    className="w-full"
                    disabled={isPendingDeleteLocation}
                    onPress={handleDeleteLocation}
                  />
                </View>
              </PopoverContent>
            </Popover>
          )}
        </View>
        <View className="flex mt-3 flex-nowrap gap-2">
          {place.photos?.slice(0, 3).map(photo => {
            const typedPhoto = photo as Photos;

            return (
              <View
                key={typedPhoto.photo_reference}
                className="relative aspect-square flex-1 overflow-hidden rounded-lg"
              >
                <Image
                  className="size-full max-w-none object-cover"
                  alt={`Image ${typedPhoto.photo_reference}`}
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${typedPhoto.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`,
                  }}
                />
              </View>
            );
          })}
        </View>
      </Pressable>
      {place.place_id && (
        <LocationSettingModal isOpen={isOpenModal} placeId={place.place_id} onClose={handleClosePlaceModal} />
      )}
    </>
  );
}

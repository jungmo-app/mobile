import Map from '@/components/map';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui';
import { useAddLocation } from '@/hooks/useMutation/useAddLocation';
import { getCurrentPosition } from '@/libs/map';
import { PlaceSearchResult, Position } from '@/types/map';
import { ApiError } from '@/utils/api';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function Footer() {
  const { id } = useLocalSearchParams();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);

  const { mutate: addLocation, isPending } = useAddLocation(Number(id), {
    onError: (error: ApiError) => {
      if (error.code === 'GL003') {
        alert('이미 모임에 해당장소가 포함되어 있습니다.');
        return;
      }
      alert('장소 추가에 실패하였습니다');
    },
  });

  const handlePressButton = async () => {
    try {
      const location = await getCurrentPosition();
      setCurrentLocation(location);
    } catch {
      setCurrentLocation(null);
    } finally {
      setIsOpenModal(true);
    }
  };

  const handleCloseMap = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleSelectLocation = async (value: PlaceSearchResult) => {
    if (!value.place_id) {
      return;
    }
    addLocation(value);
  };

  return (
    <Sheet isOpen={isOpenModal} onOpenChange={setIsOpenModal}>
      <SheetTrigger>
        <View className="w-full pt-1">
          <Button
            className="w-full rounded-xl"
            size="lg"
            aria-label="방문 장소 추가"
            title="방문 장소 추가"
            disabled={isPending}
            onPress={handlePressButton}
          />
        </View>
      </SheetTrigger>
      <SheetContent position="right" size="100%" className="flex h-full w-full p-0" isClose={false}>
        <Map
          open={isOpenModal}
          title="방문 장소 추가하기"
          target={['name', 'formatted_address', 'icon_background_color', 'geometry', 'photo', 'type', 'place_id']}
          currentLocation={currentLocation}
          onClose={handleCloseMap}
          onSelect={handleSelectLocation}
        />
      </SheetContent>
    </Sheet>
  );
}

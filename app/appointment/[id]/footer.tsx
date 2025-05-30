import Map from '@/components/map';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui';
import { getCurrentPosition } from '@/libs/map';
import { PlaceSearchResult, Position } from '@/types/map';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function Footer() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);

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
    console.log(value);
  };

  return (
    <Sheet isOpen={isOpenModal} onOpenChange={setIsOpenModal}>
      <SheetTrigger>
        <View className="w-full pt-1">
          <Button
            className="w-full rounded-xl"
            size="lg"
            aria-label="장소 추가"
            title="장소 추가"
            onPress={handlePressButton}
          />
        </View>
      </SheetTrigger>
      <SheetContent>
        <Map
          open={isOpenModal}
          currentLocation={currentLocation}
          onClose={handleCloseMap}
          onSelect={handleSelectLocation}
        />
      </SheetContent>
    </Sheet>
  );
}

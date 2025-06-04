import Map from '@/components/map';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui';
import { getCurrentPosition } from '@/libs/map';
import { meetingLocationSchema } from '@/schemas/appointment';
import { PlaceSearchResult, Position } from '@/types/map';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';

type MeetingLocationType = z.infer<typeof meetingLocationSchema>;

type LocationInputProps = {
  value: MeetingLocationType;
  onChange: (value: { name: string; id: string; address: string }) => Promise<void> | void;
};

export default function LocationInput({ value, onChange }: LocationInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);

  const handleButtonPress = async () => {
    const location = await getCurrentPosition();
    console.log(location);
    setCurrentLocation(location);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSelectLocation = async (value: PlaceSearchResult) => {
    if (!value.place_id || !value.formatted_address || !value.name) {
      return;
    }
    await onChange({ id: value.place_id, address: value.formatted_address, name: value.name });
  };

  return (
    <Sheet isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
      <SheetTrigger>
        <Pressable className="w-full" onPress={handleButtonPress}>
          <View className="flex h-10 items-center rounded-md border border-gray-300 px-3">
            <Text className={`${value.name !== '' ? 'text-foreground' : 'text-gray-500'}`}>
              {value.name !== '' ? value.name : '장소를 입력해주세요'}
            </Text>
          </View>
        </Pressable>
      </SheetTrigger>
      <SheetContent position="right" className="flex h-full w-full p-0" size="100%" isClose={false}>
        <Map
          open={isModalOpen}
          currentLocation={currentLocation}
          onClose={handleClose}
          onSelect={handleSelectLocation}
        />
      </SheetContent>
    </Sheet>
  );
}

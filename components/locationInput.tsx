import Map from '@/components/map';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui';
import { getCurrentPosition } from '@/libs/map';
import { meetingLocationSchema } from '@/schemas/appointment';
import { Position } from '@/types/map';
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
  const [currentLocation, setCurrentLocation] = useState<Position>({ latitude: 37.5611628, longitude: 127.0225117 });

  const handleButtonClick = async () => {
    const location = await getCurrentPosition();
    setCurrentLocation(location);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  /* const handleSelectLocation = async (value: PlaceSearchResult) => {
    if (!value.place_id || !value.formatted_address || !value.name) {
      return;
    }
    await onChange({ id: value.place_id, address: value.formatted_address, name: value.name });
  }; */

  console.log(isModalOpen, value.name);

  return (
    <Sheet isOpen={isModalOpen}>
      <SheetTrigger>
        <Pressable className="w-full" onPress={handleButtonClick}>
          <View className="flex h-10 items-center rounded-md border border-gray-300 px-3">
            <Text className={`${value.name !== '' ? 'text-foreground' : 'text-gray-500'}`}>
              {value.name !== '' ? value.name : '장소를 입력해주세요'}
            </Text>
          </View>
        </Pressable>
      </SheetTrigger>
      <SheetContent position="right" className="w-full p-0" size="100%">
        <Map currentLocation={currentLocation} onClose={handleClose} />
      </SheetContent>
    </Sheet>
  );
}

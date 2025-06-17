import Map from '@/components/map';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui';
import { getCurrentPosition } from '@/libs/map';
import { ChangePlaceType, Photos, PlaceSearchResult, Position } from '@/types/map';
import { useState } from 'react';

interface EditLocationProps {
  onChange: (value: ChangePlaceType) => Promise<void>;
  isPending?: boolean;
}

export default function EditLocation({ onChange, isPending }: EditLocationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);

  const handlePressEditButton = async () => {
    const position = await getCurrentPosition();
    setCurrentLocation(position);
    setIsOpen(true);
  };

  const handleCloseMap = () => {
    setIsOpen(false);
  };

  const handleSelectLocation = async (value: PlaceSearchResult) => {
    await onChange({
      placeId: value.place_id ?? '',
      images: value.photos
        ? value.photos.map(photo => {
            const typedPhoto = photo as Photos;
            return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${typedPhoto.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
          })
        : [],
      address: value.formatted_address ?? '',
      name: value.name ?? '',
      tags: value.types ?? [],
      point: value.geometry,
    });

    setIsOpen(false);
  };
  return (
    <>
      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            aria-label="편집"
            disabled={isPending}
            className="select-none"
            title="편집"
            onPress={handlePressEditButton}
          />
        </SheetTrigger>
        <SheetContent position="right" size="100%" className="flex h-full w-full p-0" isClose={false}>
          <Map
            open={isOpen}
            currentLocation={currentLocation}
            title="장소 변경하기"
            target={['name', 'formatted_address', 'icon_background_color', 'geometry', 'photo', 'type', 'place_id']}
            onClose={handleCloseMap}
            onSelect={handleSelectLocation}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

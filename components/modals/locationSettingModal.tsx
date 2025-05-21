import { GOOGLE_MAP_FIELD } from '@/constants/place';
import { useLocation } from '@/hooks/useQuery/useLocation';
import { Photos, PlaceSearchResult } from '@/types/map';
import { X } from 'lucide-react-native';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, Input, Label, Sheet, SheetClose, SheetContent } from '../ui';

interface LocationSettingModalProps {
  isOpen: boolean;
  placeId: string | null;
  target?: (typeof GOOGLE_MAP_FIELD)[number][];
  onClose: (entireClose?: boolean) => void;
  onSelect?: (value: PlaceSearchResult) => Promise<void> | void;
}

export default function LocationSettingModal({
  isOpen,
  placeId,
  target,
  onClose,
  onSelect,
}: LocationSettingModalProps) {
  const { data: location, isPending } = useLocation(placeId ?? '', [
    'name',
    'formatted_address',
    'photo',
    'type',
    'place_id',
    ...(target ?? []),
  ]);

  const handlePressButton = async () => {
    if (onSelect && location) {
      await onSelect(location);
    }

    onClose(true);
  };

  return (
    <Sheet isOpen={isOpen} onOpenChange={() => onClose(false)}>
      <SheetContent size="50%" isClose={false} className="pb-0">
        <View className="flex mb-2 items-center justify-between">
          <Text className="text-2xl font-bold">장소 정보</Text>
          <View className="flex relative items-center justify-center">
            <SheetClose>
              <View className="z-10 rounded-full p-2 active:bg-gray-200">
                <X size={20} color="black" />
              </View>
            </SheetClose>
          </View>
        </View>
        {isPending ? (
          <View className="flex-1 items-center justify-center">
            <Text>장소 데이터 가져오는 중...</Text>
          </View>
        ) : location ? (
          <View className="flex-1 flex-col">
            <ScrollView className="flex-1 px-2">
              <View className="flex mb-5 flex-col gap-3 pt-2">
                <View>
                  <Label className="text-neutral-400">주소</Label>
                  <View className="mt-1 p-1">
                    <Input readOnly value={location.formatted_address} className="border-none bg-neutral-100" />
                  </View>
                </View>
                <View>
                  <Label className="text-neutral-400">장소명</Label>
                  <View className="mt-1 p-1">
                    <Input readOnly value={location.name} />
                  </View>
                </View>
                <View>
                  <Label className="text-neutral-400">카테고리 태그</Label>
                  <View className="flex mt-1 flex-wrap items-center gap-2 p-1">
                    {location.types?.map((item, index) => (
                      <Button
                        key={index}
                        className="cursor-default"
                        variant={index !== 0 ? 'outline' : 'default'}
                        aria-label={`카테고리 ${item}`}
                        title={`#${item}`}
                      />
                    ))}
                  </View>
                </View>
                <View>
                  <Label className="text-neutral-400">이미지</Label>
                  <View className="flex mt-1 flex-wrap gap-2 p-1">
                    {location.photos?.length === 0 || location.photos === undefined ? (
                      <Text className="mt-2">이미지가 없습니다</Text>
                    ) : (
                      location.photos.map((photo, index) => {
                        const typedPhoto = photo as Photos;
                        return (
                          <View
                            key={index}
                            className="flex relative size-[78px] items-center justify-center overflow-hidden rounded-lg border border-solid border-neutral-300"
                          >
                            <Image
                              className="size-full max-w-none object-cover"
                              alt={`Image ${index}`}
                              source={{
                                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${typedPhoto.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`,
                              }}
                            />
                          </View>
                        );
                      })
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>
            {onSelect && (
              <View className="flex z-[60] w-full border-t border-solid border-neutral-300 p-4 font-bold">
                <Button className="h-12 w-full" aria-label="저장" title="저장하기" onPress={handlePressButton} />
              </View>
            )}
          </View>
        ) : (
          <View className="flex flex-1 items-center justify-center">
            <Text>장소 정보를 가져올 수 없습니다</Text>
          </View>
        )}
      </SheetContent>
    </Sheet>
  );
}

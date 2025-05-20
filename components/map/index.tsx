import { apis } from '@/apis';
import Header from '@/components/header';
import { GOOGLE_MAP_FIELD } from '@/constants/place';
import { PlaceSearchDataType, PlaceSearchResult, Position, SearchStatusType } from '@/types/map';
import { formattedCoordinate, getRadiusFromZoom, isPointInSearchArea } from '@/utils/map';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import MapView from 'react-native-maps';
import MapLoader from './mapLoader';
import SearchLocaitonBox from './searchLocationBox';

interface MapProps {
  currentLocation: Position | null;
  open: boolean;
  target?: (typeof GOOGLE_MAP_FIELD)[number][];
  onClose: () => void;
  onSelect: (value: PlaceSearchResult) => Promise<void> | void;
}

interface IFormInput {
  inputValue: string;
}

export default function Map({ currentLocation, open, target, onClose, onSelect }: MapProps) {
  const mapRef = useRef<MapView>(null);

  const method = useForm<IFormInput>();
  const queryCleint = useQueryClient();

  const [markers, setMarkers] = useState<PlaceSearchDataType[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatusType | null>(null);

  const handleSubmitSearchForm = async (value: IFormInput) => {
    if (!mapRef.current) {
      return;
    }

    const { center, zoom = 14 } = await mapRef.current.getCamera();
    const radius = getRadiusFromZoom(center.latitude, zoom);

    const places = await queryCleint.fetchQuery({
      queryKey: ['searchPlace', value.inputValue, center.latitude, center.longitude, radius],
      queryFn: () => apis.place.getSearchResult(value.inputValue, center, radius),
    });

    if (!places) {
      return;
    }

    const placeResult = places.filter(item => item.location !== undefined) as PlaceSearchDataType[];

    setMarkers(placeResult);

    const placeCoordinate = formattedCoordinate(placeResult[0].location);
    mapRef.current.animateCamera({
      center: placeCoordinate,
    });

    if (isPointInSearchArea(placeCoordinate, { center, zoom })) {
      setSearchStatus({ center, zoom });
    } else {
      setSearchStatus({ center: placeCoordinate, zoom });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex m-0 flex-1 flex-col bg-background p-0">
        {currentLocation ? (
          <FormProvider {...method}>
            <Header title="장소 추가하기" className="relative" onClose={onClose} />
            <SearchLocaitonBox onSubmit={method.handleSubmit(handleSubmitSearchForm)} />
            <MapLoader
              ref={mapRef}
              target={target}
              position={currentLocation}
              markers={markers}
              searchStatus={searchStatus}
              open={open}
              onResearch={method.handleSubmit(handleSubmitSearchForm)}
              onClose={onClose}
              onSelect={onSelect}
            />
          </FormProvider>
        ) : (
          <View className="flex flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

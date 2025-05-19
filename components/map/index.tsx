import { apis } from '@/apis';
import Header from '@/components/header';
import { PlaceSearchDataType, Position, SearchStatusType } from '@/types/map';
import { formattedCoordinate, getRadiusFromZoom } from '@/utils/map';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { LoadingIcon } from '../ui';
import MapLoader from './mapLoader';
import SearchLocaitonBox from './searchLocationBox';

interface MapProps {
  currentLocation: Position | null;
  open: boolean;
  onClose: () => void;
}

interface IFormInput {
  inputValue: string;
}

export default function Map({ currentLocation, open, onClose }: MapProps) {
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
    setMarkers(places);
    mapRef.current.animateCamera({
      center: formattedCoordinate(places[0].location),
    });
    setSearchStatus({ center, zoom: zoom });
  };

  return (
    <View className="flex m-0 flex-1 flex-col bg-background p-0">
      {currentLocation ? (
        <FormProvider {...method}>
          <Header title="장소 추가하기" className="relative" onClose={onClose} />
          <SearchLocaitonBox onSubmit={method.handleSubmit(handleSubmitSearchForm)} />
          <MapLoader
            ref={mapRef}
            position={currentLocation}
            markers={markers}
            searchStatus={searchStatus}
            open={open}
            onResearch={method.handleSubmit(handleSubmitSearchForm)}
          />
        </FormProvider>
      ) : (
        <View className="flex flex-1 items-center justify-center">
          <LoadingIcon />
        </View>
      )}
    </View>
  );
}

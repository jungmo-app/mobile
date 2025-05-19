import { PlaceSearchDataType, Position, SearchStatusType } from '@/types/map';
import { formattedCoordinate, isPositionVisible, isRegionIntersectingZoomedArea } from '@/utils/map';
import { LocateFixed } from 'lucide-react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Button } from '../ui';

interface MapLoaderProps {
  position: Position | null;
  open: boolean;
  markers: PlaceSearchDataType[];
  searchStatus: SearchStatusType | null;
  onResearch: () => void;
}

const MapLoader = forwardRef<MapView, MapLoaderProps>(({ position, markers, searchStatus, open, onResearch }, ref) => {
  const mapRef = useRef<MapView>(null);

  const [isReady, setIsReady] = useState(false);
  const [isViewRecenterButton, setIsViewRecenterButton] = useState(false);
  const [isViewUpdateSearchButton, setIsViewUpdateSearchButton] = useState(false);

  useImperativeHandle(ref, () => mapRef.current!, []);

  const handleIdle = (region: Region) => {
    if (!position) {
      return;
    }
    setIsViewRecenterButton(!isPositionVisible(region, position, 0.5));
    if (!searchStatus) {
      return;
    }
    setIsViewUpdateSearchButton(!isRegionIntersectingZoomedArea(region, searchStatus));
    console.log(region);
  };

  const handleClickRecenterButton = () => {
    mapRef.current?.animateCamera(
      {
        center: position ?? { latitude: 37.5611628, longitude: 127.0225117 },
      },
      { duration: 500 }
    );
  };

  const handleClickUpdateButton = () => {
    setIsViewUpdateSearchButton(false);
    onResearch();
  };

  useEffect(() => {
    if (!position || !mapRef.current || !open || !isReady) {
      return;
    }

    mapRef.current.animateCamera({
      center: position,
      zoom: 14,
    });
  }, [position, open, isReady]);

  return (
    <View className="relative flex-1">
      {position && (
        <>
          <MapView
            key={open ? 'open' : 'closed'}
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              ...position,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            onRegionChangeComplete={handleIdle}
            onMapReady={() => setIsReady(true)}
          >
            {markers.map(marker => (
              <Marker key={marker.place_id} coordinate={formattedCoordinate(marker.location)} />
            ))}
          </MapView>
          {isViewRecenterButton && (
            <Button
              variant="ghost"
              className="absolute bottom-4 right-4 z-[9999] size-12 rounded-full bg-background shadow"
              onPress={handleClickRecenterButton}
            >
              <View className="flex items-center justify-center">
                <LocateFixed size={16} color="black" />
              </View>
            </Button>
          )}
          {isViewUpdateSearchButton && (
            <Button
              variant="ghost"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background"
              onPress={handleClickUpdateButton}
            >
              <View>
                <Text className="text-foreground">현재 위치에서 검색</Text>
              </View>
            </Button>
          )}
        </>
      )}
    </View>
  );
});

MapLoader.displayName = 'MapLoader';

export default MapLoader;

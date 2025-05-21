import { GOOGLE_MAP_FIELD } from '@/constants/place';
import { PlaceSearchDataType, PlaceSearchResult, Position, SearchStatusType } from '@/types/map';
import { formattedCoordinate, isPositionVisible, isRegionIntersectingZoomedArea } from '@/utils/map';
import { LocateFixed } from 'lucide-react-native';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import LocationSettingModal from '../modals/locationSettingModal';
import { Button } from '../ui';

interface MapLoaderProps {
  position: Position | null;
  open: boolean;
  markers: PlaceSearchDataType[];
  searchStatus: SearchStatusType | null;
  target?: (typeof GOOGLE_MAP_FIELD)[number][];
  onResearch: () => void;
  onClose?: () => void;
  onSelect: (value: PlaceSearchResult) => Promise<void> | void;
}

const MapLoader = forwardRef<MapView, MapLoaderProps>(
  ({ position, markers, searchStatus, open, target, onResearch, onClose, onSelect }, ref) => {
    const mapRef = useRef<MapView>(null);

    const [isReady, setIsReady] = useState(false);
    const [isViewRecenterButton, setIsViewRecenterButton] = useState(false);
    const [isViewUpdateSearchButton, setIsViewUpdateSearchButton] = useState(false);

    const [pressedId, setPressedId] = useState<string | null>(null);

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
    };

    const handlePressMarker = (id: string) => {
      setPressedId(id);
    };

    const handlePressRecenterButton = () => {
      mapRef.current?.animateCamera(
        {
          center: position ?? { latitude: 37.5611628, longitude: 127.0225117 },
        },
        { duration: 500 }
      );
    };

    const handlePressUpdateButton = () => {
      setIsViewUpdateSearchButton(false);
      onResearch();
    };

    const handleClosePlaceModal = useCallback(
      (entireClose?: boolean) => {
        setPressedId(null);
        if (entireClose && onClose) {
          onClose();
        }
      },
      [onClose]
    );

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
                <Marker
                  key={marker.place_id}
                  coordinate={formattedCoordinate(marker.location)}
                  onPress={() => handlePressMarker(marker.place_id)}
                />
              ))}
            </MapView>
            {isViewRecenterButton && (
              <Button
                variant="ghost"
                className="absolute bottom-4 right-4 z-[9999] size-12 rounded-full bg-background shadow"
                onPress={handlePressRecenterButton}
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
                onPress={handlePressUpdateButton}
              >
                <View>
                  <Text className="text-foreground">현재 위치에서 검색</Text>
                </View>
              </Button>
            )}
            <LocationSettingModal
              isOpen={Boolean(pressedId)}
              target={target}
              placeId={pressedId}
              onClose={handleClosePlaceModal}
              onSelect={onSelect}
            />
          </>
        )}
      </View>
    );
  }
);

MapLoader.displayName = 'MapLoader';

export default MapLoader;

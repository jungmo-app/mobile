import { Position } from '@/types/map';
import { isPositionVisible } from '@/utils/map';
import { LocateFixed } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Button } from '../ui';

interface MapLoaderProps {
  position: Position;
}

export default function MapLoader({ position }: MapLoaderProps) {
  const mapRef = useRef<MapView>(null);

  const [isViewRecenterButton, setIsViewRecenterButton] = useState(false);
  /* const [isViewUpdateButton, setIsViewUpdateButton] = useState(false); */

  const handleIdle = (region: Region) => {
    setIsViewRecenterButton(!isPositionVisible(region, position, 0.5));
  };

  const handleClickRecenterButton = () => {
    mapRef.current?.animateCamera(
      {
        center: position,
      },
      { duration: 500 }
    );
  };

  return (
    <View className="relative flex-1">
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...position,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onRegionChangeComplete={handleIdle}
      />
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
    </View>
  );
}

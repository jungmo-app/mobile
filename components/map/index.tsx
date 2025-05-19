import Header from '@/components/header';
import { Position } from '@/types/map';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import MapLoader from './mapLoader';
import SearchLocaitonBox from './searchLocationBox';

interface MapProps {
  currentLocation: Position;
  onClose: () => void;
}

interface IFormInput {
  inputValue: string;
}

export default function Map({ currentLocation, onClose }: MapProps) {
  const method = useForm<IFormInput>();
  return (
    <View className="flex m-0 flex-1 flex-col bg-background p-0">
      <FormProvider {...method}>
        <Header title="장소 추가하기" className="relative" onClose={onClose} />
        <SearchLocaitonBox />
        <MapLoader position={currentLocation} />
      </FormProvider>
    </View>
  );
}

import { Position } from '@/types/map';
import { Region } from 'react-native-maps';

export const isPositionVisible = (region: Region, position: Position, ratio: number = 1) => {
  const latDelta = region.latitudeDelta * ratio;
  const lngDelta = region.longitudeDelta * ratio;

  const latMin = region.latitude - latDelta / 2;
  const latMax = region.latitude + latDelta / 2;
  const lngMin = region.longitude - lngDelta / 2;
  const lngMax = region.longitude + lngDelta / 2;

  return (
    position.latitude >= latMin &&
    position.latitude <= latMax &&
    position.longitude >= lngMin &&
    position.longitude <= lngMax
  );
};

export const isRegionIntersects = (a: Region, b: Region) => {
  const aLatMin = a.latitude - a.latitudeDelta / 2;
  const aLatMax = a.latitude + a.latitudeDelta / 2;
  const aLngMin = a.longitude - a.longitudeDelta / 2;
  const aLngMax = a.longitude + a.longitudeDelta / 2;

  const bLatMin = b.latitude - b.latitudeDelta / 2;
  const bLatMax = b.latitude + b.latitudeDelta / 2;
  const bLngMin = b.longitude - b.longitudeDelta / 2;
  const bLngMax = b.longitude + b.longitudeDelta / 2;

  const latOverlap = aLatMin <= bLatMax && aLatMax >= bLatMin;
  const lngOverlap = aLngMin <= bLngMax && aLngMax >= bLngMin;

  return latOverlap && lngOverlap;
};

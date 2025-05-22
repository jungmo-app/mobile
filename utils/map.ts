import { Location, Position, SearchStatusType } from '@/types/map';
import { Dimensions } from 'react-native';
import { Region } from 'react-native-maps';

export const zoomToLatitudeDelta = (zoom: number): number => {
  return 360 / Math.pow(2, zoom);
};

export const zoomToLongitudeDelta = (zoom: number, latitude: number): number => {
  const latRadians = (latitude * Math.PI) / 180;
  return 360 / (Math.pow(2, zoom) * Math.cos(latRadians));
};

export const isPointInSearchArea = (position: Position, area: SearchStatusType): boolean => {
  const {
    center: { latitude: centerLat, longitude: centerLng },
    zoom,
  } = area;

  const latDelta = zoomToLatitudeDelta(zoom);
  const lngDelta = zoomToLongitudeDelta(zoom, centerLat);

  const latMin = centerLat - latDelta / 2;
  const latMax = centerLat + latDelta / 2;
  const lngMin = centerLng - lngDelta / 2;
  const lngMax = centerLng + lngDelta / 2;

  return (
    position.latitude >= latMin &&
    position.latitude <= latMax &&
    position.longitude >= lngMin &&
    position.longitude <= lngMax
  );
};

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

export const isRegionIntersectingZoomedArea = (region: Region, circle: SearchStatusType) => {
  const {
    center: { latitude, longitude },
    zoom,
  } = circle;
  const aLatMin = region.latitude - region.latitudeDelta / 2;
  const aLatMax = region.latitude + region.latitudeDelta / 2;
  const aLngMin = region.longitude - region.longitudeDelta / 2;
  const aLngMax = region.longitude + region.longitudeDelta / 2;

  const latDelta = zoomToLatitudeDelta(zoom);
  const lngDelta = zoomToLongitudeDelta(zoom, latitude);

  const bLatMin = latitude - latDelta / 2;
  const bLatMax = latitude + latDelta / 2;
  const bLngMin = longitude - lngDelta / 2;
  const bLngMax = longitude + lngDelta / 2;

  const latOverlap = aLatMin <= bLatMax && aLatMax >= bLatMin;
  const lngOverlap = aLngMin <= bLngMax && aLngMax >= bLngMin;

  return latOverlap && lngOverlap;
};

export const isSearchAreaIntersecting = (areaA: SearchStatusType, areaB: SearchStatusType) => {
  const {
    center: { latitude: latA, longitude: lngA },
    zoom: zoomA,
  } = areaA;

  const {
    center: { latitude: latB, longitude: lngB },
    zoom: zoomB,
  } = areaB;

  const latDeltaA = zoomToLatitudeDelta(zoomA);
  const lngDeltaA = zoomToLongitudeDelta(zoomA, latA);
  const latDeltaB = zoomToLatitudeDelta(zoomB);
  const lngDeltaB = zoomToLongitudeDelta(zoomB, latB);

  const aLatMin = latA - latDeltaA / 2;
  const aLatMax = latA + latDeltaA / 2;
  const aLngMin = lngA - lngDeltaA / 2;
  const aLngMax = lngA + lngDeltaA / 2;

  const bLatMin = latB - latDeltaB / 2;
  const bLatMax = latB + latDeltaB / 2;
  const bLngMin = lngB - lngDeltaB / 2;
  const bLngMax = lngB + lngDeltaB / 2;

  const latOverlap = aLatMin <= bLatMax && aLatMax >= bLatMin;
  const lngOverlap = aLngMin <= bLngMax && aLngMax >= bLngMin;

  return latOverlap && lngOverlap;
};

export const formattedCoordinate = (location: Location) => {
  const { lat, lng } = location;
  return {
    latitude: lat,
    longitude: lng,
  } as Position;
};

export const getRadiusFromZoom = (latitude: number, zoom: number) => {
  const earthCircumference = 40075017;
  const latitudeRad = latitude * (Math.PI / 180);
  const metersPerPixel = (earthCircumference * Math.cos(latitudeRad)) / Math.pow(2, zoom + 8);
  const screenWidth = Dimensions.get('window').width;
  const radius = (screenWidth / 2) * metersPerPixel;
  return radius;
};

export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): [string, 'km' | 'm'] => {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  if (R * c < 1) {
    return [(R * c * 1000).toFixed(2), 'm'];
  }
  return [(R * c).toFixed(2), 'km'];
};

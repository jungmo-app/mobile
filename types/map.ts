export interface Position {
  latitude: number;
  longitude: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface PlaceSearchResult {
  name: string;
  place_id: string;
  formatted_address: string;
  geometry: {
    location: Location;
    viewport?: {
      northeast: Location;
      southwest: Location;
    };
  };
  icon?: string;
  business_status?: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  opening_hours?: {
    open_now: boolean;
  };
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[];
  }[];
}

export interface PlaceSearchDataType {
  name: string;
  location: Location;
  formatted_address: string;
  place_id: string;
}

export interface PlaceDataType {
  placeId: string;
  images: string[];
  address: string;
  name: string;
  tags: string[];
}

export interface SearchStatusType {
  center: Position;
  zoom: number;
}

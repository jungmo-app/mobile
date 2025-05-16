export interface Position {
  lat: number;
  lng: number;
}

export interface PlaceSearchResult {
  name: string;
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
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
  location: {
    lat: number;
    lng: number;
  };
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

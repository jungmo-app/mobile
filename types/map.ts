export interface Position {
  latitude: number;
  longitude: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Geometry {
  location: Location;
  viewport?: {
    northeast: Location;
    southwest: Location;
  };
}

export interface PlaceSearchResult {
  address_components?: { long_name: string; short_name: string; types: string[] };
  adr_address?: string;
  aspects?: {
    rating: number;
    type: string;
  }[];
  formatted_address?: string;
  formatted_phone_number?: string;
  geometry?: Geometry;
  html_attributions?: string[];
  icon?: string;
  id?: string;
  international_phone_number?: string;
  icon_background_color?: string;
  name: string;
  permanently_closed?: boolean;
  photos?: PlacePhoto[];
  place_id: string;
  plus_code?: {
    compound_code?: string;
    global_code: string;
  };
  price_level?: number;
  rating?: number;
  reviews?: {
    aspects: {
      rating: number;
      type: string;
    }[];
    author_name: string;
    author_url?: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  };
  types?: string[];
  url?: string;
  user_ratings_total?: number;
  utc_offset?: number;
  utc_offset_minutes?: number;
  vicinity?: string;
  website?: string;
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

export interface PhotoOptions {
  maxHeight?: number | null;
  maxWidth?: number | null;
}

interface PlacePhoto {
  height: number;
  html_attributions: string[];
  width: number;
  getUrl(opts: PhotoOptions): string;
}

export interface Photos extends PlacePhoto {
  photo_reference: string;
}

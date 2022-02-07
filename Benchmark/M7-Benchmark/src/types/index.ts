export interface LocationType {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface LocationActionType {
  type: string;
  payload: LocationType;
}

export interface StoreType {
  location: {
    active: LocationType;
    favs: LocationType[];
  };
}

export interface WeatherType {
  current: {
    temp: number;
    wind_speed: number;
    feels_like: number;
    uvi: number;
    pressure: number;
    weather: {
      main: string;
    }[];
  };
}

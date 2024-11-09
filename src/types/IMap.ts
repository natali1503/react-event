export interface IYandexMap {
  setCenter: (coordinates: [number, number]) => void;
  setZoom: (zoom: number) => void;
  geoObjects: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add: (objectManager: any) => void;
  };
};

export interface IYandexObjectManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add: (features: any[]) => void;
  removeAll: () => void;
}

export interface ILocation {
  latitude: number;
  longitude: number;
  district?: string;
  city?: string;
  endingDate?: string
};


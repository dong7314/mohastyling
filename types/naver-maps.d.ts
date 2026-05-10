interface Window {
  naver?: {
    maps: {
      Map: new (container: HTMLElement | string, options: Record<string, unknown>) => unknown;
      LatLng: new (lat: number, lng: number) => unknown;
      Marker: new (options: Record<string, unknown>) => unknown;
      Event: {
        addListener: (target: unknown, event: string, handler: () => void) => unknown;
      };
    };
  };
  initNaverMap?: () => void;
}

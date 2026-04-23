declare module 'jquery.ripples' {
  // Side-effect only module
}

declare global {
  interface JQuery {
    ripples(method: 'destroy'): JQuery;
    ripples(method: 'drop', x: number, y: number, radius?: number, strength?: number): JQuery;
    ripples(method: 'dropAt', x: number, y: number, strength?: number): JQuery;
    ripples(options?: {
      resolution?: number;
      dropRadius?: number;
      perturbance?: number;
      interactive?: boolean;
    }): JQuery;
  }
}

export {};

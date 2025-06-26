declare module '@splidejs/splide-extension-auto-scroll' {
  type AutoScrollType = {
    new (): {
      mount(): void;
      destroy(): void;
    };
  };

  export const AutoScroll: AutoScrollType;
}

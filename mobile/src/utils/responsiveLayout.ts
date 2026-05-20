export type ResponsiveLayout = {
  width: number;
  height: number;
  shortestSide: number;
  longestSide: number;
  isLandscape: boolean;
  isCompact: boolean;
  isWide: boolean;
  isFoldable: boolean;
  isTablet: boolean;
  isWideShort: boolean;
  contentMaxWidth: number;
  panelMaxWidth: number;
  pageGutter: number;
};

export const getResponsiveLayout = (width: number, height: number): ResponsiveLayout => {
  const shortestSide = Math.min(width, height);
  const longestSide = Math.max(width, height);
  const isLandscape = width > height;
  const isCompact = height < 450 || width < 380;
  const isWide = width >= 700;
  const isTablet = shortestSide >= 720;
  const isFoldable = shortestSide >= 520 && longestSide >= 700 && !isTablet;
  const isWideShort = isWide && height < 680;

  return {
    width,
    height,
    shortestSide,
    longestSide,
    isLandscape,
    isCompact,
    isWide,
    isFoldable,
    isTablet,
    isWideShort,
    contentMaxWidth: isTablet ? 980 : isFoldable ? 860 : 560,
    panelMaxWidth: isTablet ? 620 : isFoldable ? 560 : 520,
    pageGutter: isTablet ? 32 : isFoldable ? 24 : 16,
  };
};

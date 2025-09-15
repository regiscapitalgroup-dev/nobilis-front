import { LayoutConfig } from '../types/layout';

export const LAYOUT_CONFIGS = {
  MINIMAL: {
    showHeader: false,
    showAside: false,
    showFooter: false,
    showToolbar: false,
  },

  HEADER_ONLY: {
    showHeader: true,
    showAside: false,
    showFooter: false,
    showToolbar: false,
  },
  HEADER_FOOTER: {
    showHeader: true,
    showAside: false,
    showFooter: true,
    showToolbar: false,
    showExpFooter: true,
  },

  HEADER_FOOTER_: {
    showHeader: true,
    showAside: false,
    showFooter: true,
    showToolbar: false,
    showExpFooter: false,
  },
  FULL_DASHBOARD: {
    showHeader: true,
    showAside: true,
    showFooter: true,
    showToolbar: false,
  },
} as const;

const ROUTE_LAYOUT_MAP: Record<string, LayoutConfig> = {
  '/plans': LAYOUT_CONFIGS.MINIMAL,
  '/payment': LAYOUT_CONFIGS.MINIMAL,
  '/profile': LAYOUT_CONFIGS.MINIMAL,

  '/biography': LAYOUT_CONFIGS.HEADER_FOOTER,
  '/expert': LAYOUT_CONFIGS.HEADER_FOOTER_,

  '/dashboard': LAYOUT_CONFIGS.FULL_DASHBOARD,

};

export const getLayoutConfig = (pathname: string): LayoutConfig => {
  if (ROUTE_LAYOUT_MAP[pathname]) {
    return ROUTE_LAYOUT_MAP[pathname];
  }

  for (const [route, config] of Object.entries(ROUTE_LAYOUT_MAP)) {
    if (pathname.startsWith(route) && route !== '/') {
      return config;
    }
  }

  return LAYOUT_CONFIGS.MINIMAL;
};

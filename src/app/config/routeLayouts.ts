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
  HEADER_FOOTER_ADMIN: {
    showHeader: true,
    showAside: true,
    showFooter: true,
    showToolbar: false,
    showExpFooter: false,
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
  PROFILE: {
    showHeader: true,
    showAside: true,
    showFooter: true,
    showToolbar: false,
    showExpFooter: false,
  },
} as const;

const ROUTE_LAYOUT_MAP: Record<string, LayoutConfig> = {
  '/plans': LAYOUT_CONFIGS.MINIMAL,
  '/payment': LAYOUT_CONFIGS.MINIMAL,
  '/profile': LAYOUT_CONFIGS.MINIMAL,
  '/admin/overview': LAYOUT_CONFIGS.PROFILE,
  '/biography/overview': LAYOUT_CONFIGS.PROFILE,
  '/expertise': LAYOUT_CONFIGS.PROFILE,
  '/recognition': LAYOUT_CONFIGS.PROFILE,
  '/team': LAYOUT_CONFIGS.PROFILE,
  'payment/expert/success': LAYOUT_CONFIGS.HEADER_FOOTER_,

  '/biography': LAYOUT_CONFIGS.HEADER_FOOTER,
  '/expert': LAYOUT_CONFIGS.HEADER_FOOTER_,

  '/dashboard': LAYOUT_CONFIGS.FULL_DASHBOARD,

};

export const getLayoutConfig = (pathname: string, isAdmin: boolean): LayoutConfig => {

  if (pathname === '/biography' && isAdmin) {

    return isAdmin ? LAYOUT_CONFIGS.HEADER_FOOTER_ADMIN : LAYOUT_CONFIGS.HEADER_FOOTER;
  }

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

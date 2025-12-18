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
  FOOTER: {
    showHeader: false,
    showAside: false,
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
  '/references': LAYOUT_CONFIGS.PROFILE,
  '/experiences': LAYOUT_CONFIGS.PROFILE,
  '/experiences/create': LAYOUT_CONFIGS.PROFILE,
  'payment/expert/success': LAYOUT_CONFIGS.HEADER_FOOTER_,
  '/waitinglist': LAYOUT_CONFIGS.PROFILE,
  '/my-experience': LAYOUT_CONFIGS.PROFILE,
  '/host-experience': LAYOUT_CONFIGS.PROFILE,
  '/my-experience/success': LAYOUT_CONFIGS.PROFILE,
  '/my-experience/draft': LAYOUT_CONFIGS.PROFILE,
  '/my-experience/paused': LAYOUT_CONFIGS.PROFILE,
  '/experience/admin': LAYOUT_CONFIGS.PROFILE,
  '/experience/edit/': LAYOUT_CONFIGS.PROFILE,
  '/experience/detail/': LAYOUT_CONFIGS.FOOTER,
  '/partner/my-experiences': LAYOUT_CONFIGS.PROFILE,
  '/partner/my-experiences/draft': LAYOUT_CONFIGS.PROFILE,
  '/biography': LAYOUT_CONFIGS.PROFILE,
  '/expert': LAYOUT_CONFIGS.HEADER_FOOTER_,
  '/dashboard': LAYOUT_CONFIGS.FULL_DASHBOARD,
  '/terms-conditions': LAYOUT_CONFIGS.HEADER_FOOTER_,
  '/privacy-policy': LAYOUT_CONFIGS.HEADER_FOOTER_,
  '/membership/payment': LAYOUT_CONFIGS.MINIMAL,
  '/searchable-members': LAYOUT_CONFIGS.HEADER_ONLY,
  '/member/overview': LAYOUT_CONFIGS.HEADER_FOOTER,
  '/manage-members': LAYOUT_CONFIGS.PROFILE,
  '/profile-member': LAYOUT_CONFIGS.PROFILE,

};

export const getLayoutConfig = (pathname: string, isAdmin: boolean): LayoutConfig => {

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

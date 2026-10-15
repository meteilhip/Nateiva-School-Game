/**
 * NATEIVA EDUKIDS — PREMIUM DESIGN SYSTEM TOKENS
 * Inspired by Apple (clarity, typography, polish) and Coca-Cola (warmth, joy, bold red accents).
 */

export const DESIGN_TOKENS = {
  colors: {
    // Brand & Accent Colors
    primaryRed: '#E5252A',      // Bold signature Coca-Cola warmth & energy
    primaryRedHover: '#C81E23',
    primaryRedSubtle: '#FEE2E2',

    // Ink & Canvas
    ink: '#17233D',             // Crisp dark ink for typography and key contrast
    inkSecondary: '#4A5568',
    inkMuted: '#718096',
    canvas: '#F8FAFD',          // Clean Apple-style soft background
    canvasCard: '#FFFFFF',
    canvasElevated: '#FFFFFF',

    // Palette Tokens
    sunshine: '#FFC83D',        // Cheerful gold for coins, stars, rewards
    sunshineDark: '#D97706',
    ocean: '#377DFF',           // Clear vibrant blue for primary actions
    oceanDark: '#1D4ED8',
    oceanSubtle: '#EFF6FF',
    mint: '#38CFA4',            // Lush green for success, botany, correctness
    mintDark: '#059669',
    mintSubtle: '#ECFDF5',
    lavender: '#9A78F2',        // Playful purple for puzzles, logic, creativity
    lavenderDark: '#6D28D9',
    lavenderSubtle: '#F5F3FF',
    coral: '#FF6B6B',           // Soft warm coral for alerts / lives
    sand: '#FFFBEB',            // Soft ivory for friendly card backgrounds

    // Borders & Shadows
    borderSubtle: '#E2E8F0',
    borderStrong: '#CBD5E1',
    borderFocus: '#E5252A',
    shadowLight: 'rgba(23, 35, 61, 0.06)',
    shadowMedium: 'rgba(23, 35, 61, 0.12)',
    shadowBold: 'rgba(229, 37, 42, 0.25)'
  },

  typography: {
    fontFamilies: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    fontSizes: {
      hero: 32,
      title1: 24,
      title2: 20,
      title3: 17,
      body: 15,
      callout: 13,
      caption: 11
    },
    lineHeights: {
      hero: 38,
      title1: 30,
      title2: 26,
      body: 22
    },
    fontWeights: {
      regular: '400' as const,
      medium: '600' as const,
      bold: '700' as const,
      heavy: '900' as const
    }
  },

  radii: {
    xs: 8,
    sm: 12,
    md: 18,
    lg: 24,
    xl: 32,
    full: 9999
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    xxl: 40
  },

  dimensions: {
    touchTarget: 48,
    minTapWidth: 48,
    minTapHeight: 48
  },

  hitSlop: { top: 12, bottom: 12, left: 12, right: 12 }
};

export default DESIGN_TOKENS;

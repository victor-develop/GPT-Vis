import { registerFont } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Register fonts that support Chinese characters (CJK)
 * This is required for node-canvas to properly render Chinese text
 * Without proper font registration, Chinese characters will be displayed as Unicode escape sequences like [5bb6][5c45]
 */
export function registerCJKFonts() {
  // Common paths where Noto Sans CJK fonts might be installed
  const possibleFontPaths = [
    '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
    '/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc',
    '/System/Library/Fonts/PingFang.ttc', // macOS
    '/usr/share/fonts/truetype/wqy/wqy-microhei.ttc', // Alternative Chinese font
  ];

  // Try to register a CJK font from the system
  for (const fontPath of possibleFontPaths) {
    if (fs.existsSync(fontPath)) {
      try {
        registerFont(fontPath, {
          family: 'sans-serif',
          weight: 'normal',
          style: 'normal',
        });
        return true;
      } catch (error) {
        // Continue to next font if registration fails
        console.warn(`Failed to register font at ${fontPath}:`, error);
      }
    }
  }

  // If no CJK font is found, warn the user
  console.warn(
    'Warning: No CJK font found. Chinese characters may not render properly. ' +
      'Please install fonts-noto-cjk or similar CJK font package.'
  );
  return false;
}

// Automatically register fonts when this module is imported
let fontsRegistered = false;

export function ensureFontsRegistered() {
  if (!fontsRegistered) {
    registerCJKFonts();
    fontsRegistered = true;
  }
}

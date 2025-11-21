import { registerFont } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Register fonts that support Chinese characters (CJK)
 * This is required for node-canvas to properly render Chinese text
 * Without proper font registration, Chinese characters will be displayed as Unicode escape sequences like [5bb6][5c45]
 */
export function registerCJKFonts() {
  // Common paths where CJK fonts might be installed across different platforms
  const possibleFontPaths = [
    // Linux - Noto Sans CJK
    '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
    '/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc',
    // Linux - WenQuanYi
    '/usr/share/fonts/truetype/wqy/wqy-microhei.ttc',
    // macOS
    '/System/Library/Fonts/PingFang.ttc',
    '/Library/Fonts/Arial Unicode.ttf',
    // Windows
    'C:/Windows/Fonts/msyh.ttc', // Microsoft YaHei
    'C:/Windows/Fonts/simhei.ttf', // SimHei
  ];

  // Try to register a CJK font from the system
  for (const fontPath of possibleFontPaths) {
    if (fs.existsSync(fontPath)) {
      try {
        // Register the font with its actual family name to avoid conflicts
        // Using a generic fallback name so it works with default font settings
        registerFont(fontPath, {
          family: 'Noto Sans CJK',
          weight: 'normal',
          style: 'normal',
        });
        return true;
      } catch (error) {
        // Continue to next font if registration fails
        // Only log the error message to avoid exposing sensitive system information
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`Failed to register font at ${fontPath}: ${errorMessage}`);
      }
    }
  }

  // If no CJK font is found, warn the user
  console.warn(
    'Warning: No CJK font found. Chinese characters may not render properly. ' +
      'Please install fonts-noto-cjk (Linux), or ensure CJK fonts are available on your system.'
  );
  return false;
}

// Track whether fonts have been registered to avoid duplicate registration
let fontsRegistered = false;

/**
 * Ensure CJK fonts are registered before rendering
 * This function is idempotent and can be called multiple times safely
 */
export function ensureFontsRegistered() {
  // Node.js is single-threaded, so this check-and-set is atomic
  if (!fontsRegistered) {
    fontsRegistered = true; // Set immediately to prevent re-entry
    registerCJKFonts();
  }
}

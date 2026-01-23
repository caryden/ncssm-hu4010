/**
 * Presentation Theme Configuration
 *
 * This file defines the visual design system for presentations:
 * - Dark mode color palette
 * - Typography settings
 * - Animation timings
 * - DE Framework theme colors
 *
 * The dark theme is optimized for:
 * - Large classroom displays (80"+ TVs)
 * - Zoom streaming with screen share
 * - Reduced eye strain during evening classes
 */

import type { PresentationTheme, DETheme } from './types';

/**
 * Presentation Theme
 *
 * Dark mode color palette and design tokens.
 * These values are used to generate CSS custom properties.
 */
export const presentationTheme: PresentationTheme = {
  backgrounds: {
    primary: '#0a0a0f',    // Main background
    surface: '#12121a',    // Elevated surfaces (TOC, overlays)
    card: '#1a1a24',       // Card backgrounds
    border: '#2a2a3a',     // Border color
  },
  text: {
    primary: '#f1f1f1',    // Main text
    secondary: '#a0a0a0',  // Secondary text
    muted: '#6a6a7a',      // Very muted text (hints)
  },
  status: {
    success: '#10b981',    // Success/positive
    danger: '#ef4444',     // Error/warning
    warning: '#eab308',    // Caution
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontFamilySerif: "'Georgia', serif",
    fontFamilyMono: "'JetBrains Mono', monospace",
  },
};

/**
 * Disciplined Entrepreneurship Framework Themes
 *
 * Bill Aulet's 6 fundamental questions, each with its own color.
 * These colors are used for:
 * - Class/session badges
 * - Framework diagrams
 * - Progress indicators
 */
export const deFrameworkThemes: DETheme[] = [
  {
    number: 1,
    question: 'Who Is Your Customer?',
    description: 'Market segmentation, beachhead selection, persona',
    steps: '1-5',
    color: '#356093',  // Blue (matches NCSSM primary)
    cssVar: '--theme-1-blue',
  },
  {
    number: 2,
    question: 'What Can You Do For Them?',
    description: 'Value proposition, core, competitive position',
    steps: '6-11',
    color: '#7c3aed',  // Purple
    cssVar: '--theme-2-purple',
  },
  {
    number: 3,
    question: 'How Do They Acquire Your Product?',
    description: 'Decision-making unit, acquisition process',
    steps: '12-13',
    color: '#059669',  // Green/Emerald
    cssVar: '--theme-3-green',
  },
  {
    number: 4,
    question: 'How Do You Make Money?',
    description: 'Business model, pricing, unit economics',
    steps: '14-19',
    color: '#f59e0b',  // Amber/Gold
    cssVar: '--theme-4-amber',
  },
  {
    number: 5,
    question: 'How Do You Design & Build?',
    description: 'Test assumptions, define MVBP, validate',
    steps: '20-23',
    color: '#ef4444',  // Red
    cssVar: '--theme-5-red',
  },
  {
    number: 6,
    question: 'How Do You Scale?',
    description: 'Product plan, expansion strategy',
    steps: '24',
    color: '#06b6d4',  // Cyan
    cssVar: '--theme-6-cyan',
  },
];

/**
 * Get theme color by number
 */
export function getThemeColor(themeNumber: number): string {
  const theme = deFrameworkThemes.find(t => t.number === themeNumber);
  return theme?.color ?? presentationTheme.text.secondary;
}

/**
 * Get theme by number
 */
export function getTheme(themeNumber: number): DETheme | undefined {
  return deFrameworkThemes.find(t => t.number === themeNumber);
}

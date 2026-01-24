/**
 * Site Configuration - Main Entry Point
 *
 * This file exports the complete site configuration and all types.
 * Import from this file for a single source of truth:
 *
 * ```ts
 * import { siteConfig, institution, course } from '@config';
 * ```
 *
 * To customize for a different institution:
 * 1. Edit src/config/institution.ts - change branding
 * 2. Edit src/config/course.ts - change course content
 * 3. Optionally edit src/config/theme.ts - adjust colors
 */

// Re-export all types
export type {
  InstitutionConfig,
  Instructor,
  CourseSession,
  CourseConfig,
  DETheme,
  PresentationTheme,
  SiteConfig,
} from './types';

// Import configurations
import { institution } from './institution';
import { course } from './course';
import { presentationTheme, deFrameworkThemes, getThemeColor, getTheme } from './theme';
import type { SiteConfig } from './types';

// Re-export individual configs for granular access
export { institution } from './institution';
export { course, sessions } from './course';
export { presentationTheme, deFrameworkThemes, getThemeColor, getTheme } from './theme';

/**
 * Complete Site Configuration
 *
 * Use this for full access to all configuration:
 * ```ts
 * import { siteConfig } from '@config';
 * const title = `${siteConfig.course.name} | ${siteConfig.institution.shortName}`;
 * ```
 */
export const siteConfig: SiteConfig = {
  institution,
  course,
  theme: presentationTheme,
  deFramework: deFrameworkThemes,
};

/**
 * Helper: Generate page title
 */
export function getPageTitle(pageTitle?: string): string {
  const base = `${course.name} | ${institution.shortName} ${course.semester}`;
  return pageTitle ? `${pageTitle} | ${base}` : base;
}

/**
 * Helper: Get class presentation by number
 */
export function getSessionByNumber(num: number) {
  return course.sessions.find(s => s.number === num);
}

/**
 * Helper: Get all presentation sessions (non-break)
 */
export function getPresentationSessions() {
  return course.sessions.filter(s => s.presentationPath);
}

/**
 * Helper: Generate CSS custom properties from config
 * Use in layouts to inject theme variables
 */
export function generateCSSVariables(): string {
  return `
    :root {
      /* Institution Branding */
      --brand-primary: ${institution.primaryColor};
      --brand-primary-light: ${institution.primaryColorLight};
      --brand-primary-dark: ${institution.primaryColorDark ?? institution.primaryColor};
      --brand-accent: ${institution.accentColor};
      --brand-accent-light: ${institution.accentColorLight ?? institution.accentColor};

      /* Dark Mode Backgrounds */
      --dark-bg: ${presentationTheme.backgrounds.primary};
      --dark-surface: ${presentationTheme.backgrounds.surface};
      --dark-card: ${presentationTheme.backgrounds.card};
      --dark-border: ${presentationTheme.backgrounds.border};

      /* Text Colors */
      --text-primary: ${presentationTheme.text.primary};
      --text-secondary: ${presentationTheme.text.secondary};
      --text-muted: ${presentationTheme.text.muted};

      /* Status Colors */
      --success-green: ${presentationTheme.status.success};
      --danger-red: ${presentationTheme.status.danger};
      --warning-yellow: ${presentationTheme.status.warning};

      /* Transitions */
      --transition-fast: ${presentationTheme.transitions.fast};
      --transition-normal: ${presentationTheme.transitions.normal};
      --transition-slow: ${presentationTheme.transitions.slow};

      /* Legacy aliases (for backward compatibility) */
      --ncssm-blue: ${institution.primaryColor};
      --ncssm-blue-light: ${institution.primaryColorLight};
      --gold: ${institution.accentColor};
      --gold-light: ${institution.accentColorLight ?? institution.accentColor};

      /* Theme Color (set per-presentation) */
      --theme-color: ${institution.primaryColor};
      --theme-color-light: ${institution.primaryColorLight};

      /* DE Framework Theme Colors */
      ${deFrameworkThemes.map(t => `${t.cssVar}: ${t.color};`).join('\n      ')}

      /* Layout */
      --toc-width: 320px;
      --appendix-width: 400px;
    }
  `.trim();
}

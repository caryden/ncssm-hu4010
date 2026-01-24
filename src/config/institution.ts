/**
 * Institution Branding Configuration
 *
 * ========================================
 * TO CUSTOMIZE FOR YOUR INSTITUTION:
 * ========================================
 *
 * 1. Replace the institution name and details
 * 2. Update the brand colors to match your institution
 * 3. Add your logo to public/images/ and update the logo config
 *
 * The colors defined here will be used throughout the site:
 * - primaryColor: Main brand color (headers, accents, links)
 * - primaryColorLight: Hover states, gradients
 * - accentColor: Secondary highlights (gold/accent elements)
 */

import type { InstitutionConfig } from './types';

/**
 * NCSSM (North Carolina School of Science and Mathematics) Branding
 *
 * To use a different institution, create a new config object
 * and update the export at the bottom of this file.
 */
export const ncssmBranding: InstitutionConfig = {
  name: 'North Carolina School of Science and Mathematics',
  shortName: 'NCSSM',
  url: 'https://www.ncssm.edu',
  logo: {
    src: '/images/ncssm-logo.png',
    alt: 'NCSSM Logo',
    width: 120,
    height: 40,
  },
  // NCSSM Blue
  primaryColor: '#356093',
  primaryColorLight: '#4a7ab8',
  primaryColorDark: '#264570',
  // Gold accent
  accentColor: '#d4a028',
  accentColorLight: '#e8b84a',
};

/**
 * Example: Generic/Neutral Branding
 * Uncomment and modify to create your own institution config
 */
// export const genericBranding: InstitutionConfig = {
//   name: 'Your Institution Name',
//   shortName: 'YIN',
//   url: 'https://your-institution.edu',
//   primaryColor: '#2563eb',      // Blue
//   primaryColorLight: '#3b82f6',
//   primaryColorDark: '#1d4ed8',
//   accentColor: '#f59e0b',       // Amber
//   accentColorLight: '#fbbf24',
// };

/**
 * Example: MIT Branding
 */
// export const mitBranding: InstitutionConfig = {
//   name: 'Massachusetts Institute of Technology',
//   shortName: 'MIT',
//   url: 'https://mit.edu',
//   primaryColor: '#a31f34',      // MIT Red
//   primaryColorLight: '#c4384f',
//   primaryColorDark: '#8a1a2c',
//   accentColor: '#8a8b8c',       // MIT Gray
//   accentColorLight: '#a0a1a2',
// };

/**
 * Active Institution Configuration
 *
 * Change this export to switch institution branding site-wide.
 * All other files import from this single source.
 */
export const institution: InstitutionConfig = ncssmBranding;

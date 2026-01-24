/**
 * Configuration Types for Course Presentation Template
 *
 * This file defines all TypeScript interfaces for the configuration system.
 * These types ensure type safety across the template and provide IDE support.
 */

/**
 * Institution branding configuration
 * Customize this to swap institutional identity
 */
export interface InstitutionConfig {
  /** Full institution name */
  name: string;
  /** Short name or abbreviation */
  shortName: string;
  /** Institution website URL */
  url?: string;
  /** Logo configuration */
  logo?: {
    /** Path to logo image (relative to public/) */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Logo width in pixels */
    width?: number;
    /** Logo height in pixels */
    height?: number;
  };
  /** Primary brand color (hex) */
  primaryColor: string;
  /** Lighter variant of primary color (hex) */
  primaryColorLight: string;
  /** Darker variant of primary color (hex) */
  primaryColorDark?: string;
  /** Secondary/accent color (hex) */
  accentColor: string;
  /** Lighter variant of accent color (hex) */
  accentColorLight?: string;
}

/**
 * Instructor information
 */
export interface Instructor {
  /** Full name */
  name: string;
  /** Title or role */
  title?: string;
  /** Email address */
  email?: string;
  /** Profile URL */
  url?: string;
}

/**
 * Course session/class configuration
 */
export interface CourseSession {
  /** Session number (0-indexed) */
  number: number;
  /** Session title */
  title: string;
  /** Brief description or subtitle */
  description: string;
  /** Date string (e.g., "Feb 2") */
  date: string;
  /** Path to presentation (relative, e.g., "/class-0-introduction/presentation") */
  presentationPath?: string;
  /** DE Framework steps covered (e.g., "1-2") */
  deSteps?: string;
  /** Theme number (1-6) for color coding */
  theme?: number;
  /** Whether this is a break/no-class session */
  isBreak?: boolean;
  /** Whether this is a special session (finals, guest speaker) */
  isSpecial?: boolean;
}

/**
 * Course metadata configuration
 */
export interface CourseConfig {
  /** Full course name */
  name: string;
  /** Course code or number */
  code?: string;
  /** Course description/tagline */
  description: string;
  /** Semester and year (e.g., "Spring 2026") */
  semester: string;
  /** Meeting schedule (e.g., "Monday Evenings, 6:15 - 7:55 PM") */
  schedule: string;
  /** Location(s) */
  locations: string[];
  /** Course instructors */
  instructors: Instructor[];
  /** Course sessions/classes */
  sessions: CourseSession[];
}

/**
 * DE Framework theme configuration
 * Based on Bill Aulet's 6 fundamental questions
 */
export interface DETheme {
  /** Theme number (1-6) */
  number: number;
  /** Theme question */
  question: string;
  /** Brief description */
  description: string;
  /** DE steps covered (e.g., "1-5") */
  steps: string;
  /** Theme color (hex) */
  color: string;
  /** CSS variable name */
  cssVar: string;
}

/**
 * Presentation theme configuration
 * Dark mode colors and design tokens
 */
export interface PresentationTheme {
  /** Dark mode background colors */
  backgrounds: {
    /** Main background */
    primary: string;
    /** Elevated surface (cards, overlays) */
    surface: string;
    /** Card backgrounds */
    card: string;
    /** Border color */
    border: string;
  };
  /** Text colors */
  text: {
    /** Primary text */
    primary: string;
    /** Secondary/muted text */
    secondary: string;
    /** Very muted text (hints, metadata) */
    muted: string;
  };
  /** Status/semantic colors */
  status: {
    success: string;
    danger: string;
    warning: string;
  };
  /** Animation/transition timings */
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  /** Typography configuration */
  typography: {
    /** Primary font family (headings, UI) */
    fontFamily: string;
    /** Serif font family (quotes) */
    fontFamilySerif: string;
    /** Monospace font family (code, numbers) */
    fontFamilyMono: string;
  };
}

/**
 * Complete site configuration
 */
export interface SiteConfig {
  institution: InstitutionConfig;
  course: CourseConfig;
  theme: PresentationTheme;
  deFramework: DETheme[];
}

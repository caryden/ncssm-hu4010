/**
 * Presentation Component Types
 *
 * Shared TypeScript interfaces for all presentation components.
 * Import these types in components for consistency and IDE support.
 */

import type { HTMLAttributes } from 'astro/types';

/**
 * Slide types available in the presentation system
 */
export type SlideType =
  | 'title'
  | 'statement'
  | 'content'
  | 'visual'
  | 'quote'
  | 'list'
  | 'two-part'
  | 'comparison';

/**
 * Base props shared by all slide components
 */
export interface BaseSlideProps {
  /** Unique slide identifier (used for navigation) */
  id: string | number;
  /** Slide title (shown in TOC and as heading) */
  title?: string;
  /** Section name for TOC grouping */
  section?: string;
  /** Stable key for narration audio mapping (survives slide reordering) */
  narrationKey?: string;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for the base Slide component
 */
export interface SlideProps extends BaseSlideProps {
  /** Slide type determines layout and styling */
  type?: SlideType;
  /** Whether this is an appendix slide (hidden from main flow) */
  appendix?: boolean;
  /** Visualization name to trigger D3 drawing on slide entry */
  visualization?: string;
}

/**
 * Props for TitleSlide component
 */
export interface TitleSlideProps extends BaseSlideProps {
  /** Main title (required for title slides) */
  title: string;
  /** Subtitle displayed below title */
  subtitle?: string;
  /** Session/class info displayed at bottom */
  info?: string;
}

/**
 * Props for StatementSlide component
 */
export interface StatementSlideProps extends BaseSlideProps {
  /** Slide title for TOC */
  title: string;
}

/**
 * Props for TwoPartSlide component
 */
export interface TwoPartSlideProps extends BaseSlideProps {
  /** Slide title for TOC */
  title: string;
}

/**
 * Props for QuoteSlide component
 */
export interface QuoteSlideProps extends BaseSlideProps {
  /** Slide title for TOC */
  title?: string;
  /** Quote attribution (author, source) */
  attribution?: string;
}

/**
 * Props for ListSlide component
 */
export interface ListSlideProps extends BaseSlideProps {
  /** Slide title (required for list slides) */
  title: string;
}

/**
 * Props for StandardSlide component
 */
export interface StandardSlideProps extends BaseSlideProps {
  /** Slide title (required) */
  title: string;
  /** Override slide type (default: content) */
  type?: SlideType;
  /** Visualization name for D3 */
  visualization?: string;
}

/**
 * Comparison card variants
 */
export type ComparisonVariant = 'good' | 'bad' | 'neutral' | 'do' | 'dont';

/**
 * Props for IconCard component
 */
export interface IconCardProps {
  /** Icon character or emoji */
  icon: string;
  /** Card title */
  title?: string;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for InfoCard component
 */
export interface InfoCardProps {
  /** Card title */
  title?: string;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for ComparisonCard component
 */
export interface ComparisonCardProps {
  /** Card title */
  title?: string;
  /** Card variant determines styling */
  variant?: ComparisonVariant;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for PersonaCard component
 */
export interface PersonaCardProps {
  /** Persona name */
  name: string;
  /** Persona role/title */
  role: string;
  /** Age */
  age?: number | string;
  /** Location */
  location?: string;
  /** Education level */
  education?: string;
  /** Income range */
  income?: string;
  /** List of goals */
  goals?: string[];
  /** List of frustrations/pain points */
  frustrations?: string[];
  /** Quote from persona */
  quote?: string;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Timeline item for Timeline component
 */
export interface TimelineItem {
  /** Date or time label */
  date: string;
  /** Event label/description */
  label: string;
}

/**
 * Props for Timeline component
 */
export interface TimelineProps {
  /** Array of timeline items */
  items: TimelineItem[];
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for MetricCard component
 */
export interface MetricCardProps {
  /** Metric label */
  label: string;
  /** Metric value */
  value: string | number;
  /** Unit or suffix */
  unit?: string;
  /** Change indicator (e.g., "+15%") */
  change?: string;
  /** Whether change is positive */
  positive?: boolean;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for PricingCard component
 */
export interface PricingCardProps {
  /** Plan name */
  name: string;
  /** Price amount */
  price: string | number;
  /** Billing period */
  period?: string;
  /** List of features */
  features?: string[];
  /** Whether this is highlighted */
  featured?: boolean;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for TechniqueCard component
 */
export interface TechniqueCardProps {
  /** Technique name */
  name: string;
  /** Technique description */
  description?: string;
  /** Steps or bullet points */
  steps?: string[];
  /** Animation delay in milliseconds */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for PitchCard component
 */
export interface PitchCardProps {
  /** Card title */
  title: string;
  /** Card content/description */
  content?: string;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Props for TamCalc component (TAM Calculator)
 */
export interface TamCalcProps {
  /** Initial TAM value */
  tam?: number;
  /** Initial SAM value */
  sam?: number;
  /** Initial SOM value */
  som?: number;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Presentation Components - Barrel Export
 *
 * This file re-exports all presentation components and types for
 * convenient importing. Use this instead of individual imports:
 *
 * @example
 * // Instead of:
 * import TitleSlide from '../../components/presentation/TitleSlide.astro';
 * import StatementSlide from '../../components/presentation/StatementSlide.astro';
 *
 * // Use:
 * import { TitleSlide, StatementSlide } from '@components/presentation';
 *
 * Note: Astro component re-exports require the .astro extension and
 * default exports. For now, use direct imports for Astro components.
 * This file primarily exports types and can be extended for JS utilities.
 */

// Re-export all types
export type {
  SlideType,
  BaseSlideProps,
  SlideProps,
  TitleSlideProps,
  StatementSlideProps,
  TwoPartSlideProps,
  QuoteSlideProps,
  ListSlideProps,
  StandardSlideProps,
  ComparisonVariant,
  IconCardProps,
  InfoCardProps,
  ComparisonCardProps,
  PersonaCardProps,
  TimelineItem,
  TimelineProps,
  MetricCardProps,
  PricingCardProps,
  TechniqueCardProps,
  PitchCardProps,
  TamCalcProps,
} from './types';

/**
 * Component Import Paths
 *
 * Since Astro components can't be re-exported directly in a standard way,
 * here's a reference of all available components and their import paths:
 *
 * SLIDE COMPONENTS:
 * - Slide: Base slide wrapper
 * - TitleSlide: Opening/section title
 * - StatementSlide: Large centered statement
 * - TwoPartSlide: Primary + secondary message
 * - QuoteSlide: Attributed quote
 * - ListSlide: Bulleted list
 * - StandardSlide: Generic content slide
 *
 * CARD COMPONENTS:
 * - IconCard: Icon + title + content
 * - InfoCard: Accented information card
 * - ComparisonCard: Good/bad comparison
 * - PersonaCard: Customer persona display
 * - MetricCard: KPI display
 * - PricingCard: Pricing tier
 * - TechniqueCard: Methodology card
 * - PitchCard: Pitch information
 *
 * LAYOUT COMPONENTS:
 * - IconGrid: 3-column grid for IconCards
 * - ComparisonGrid: 2-column comparison layout
 * - Timeline: Timeline visualization
 * - TamCalc: TAM calculator
 */

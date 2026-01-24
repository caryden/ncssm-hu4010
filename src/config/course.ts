/**
 * Course Configuration
 *
 * This file contains all course-specific metadata including:
 * - Course name and description
 * - Instructor information
 * - Session schedule and topics
 *
 * Update this file to customize the course content while
 * keeping the same presentation infrastructure.
 */

import type { CourseConfig, CourseSession } from './types';

/**
 * Course Sessions/Classes
 *
 * Each session can have:
 * - number: Session number (0-indexed)
 * - title: Session title
 * - description: Brief description or DE steps covered
 * - date: Display date
 * - presentationPath: URL path to presentation (optional)
 * - theme: DE Framework theme number for color coding (1-6)
 * - isBreak: Whether this is a break/no-class
 * - isSpecial: Whether this is a special session (finals, etc.)
 */
export const sessions: CourseSession[] = [
  {
    number: 0,
    title: 'Course Introduction & Team Formation',
    description: 'Framework overview, myths vs reality, team formation',
    date: 'Feb 2',
    presentationPath: '/class-0-introduction/presentation',
    theme: 1,
  },
  {
    number: 1,
    title: 'Market Segmentation & Beachhead Selection',
    description: 'DE Steps 1-2 | Theme 1: Who is your customer?',
    date: 'Feb 9',
    presentationPath: '/class-1-market-segmentation/presentation',
    deSteps: '1-2',
    theme: 1,
  },
  {
    number: 2,
    title: 'Customer Persona & TAM',
    description: 'DE Steps 3-5 | Theme 1: Who is your customer?',
    date: 'Feb 16',
    presentationPath: '/class-2-customer-persona/presentation',
    deSteps: '3-5',
    theme: 1,
  },
  {
    number: 3,
    title: 'Value Proposition & Customer Journey',
    description: 'DE Steps 6-8 | Theme 2: What can you do for them?',
    date: 'Feb 23',
    presentationPath: '/class-3-value-proposition/presentation',
    deSteps: '6-8',
    theme: 2,
  },
  {
    number: 4,
    title: 'Competitive Positioning & Core',
    description: 'DE Steps 9-11 | Theme 2: What can you do for them?',
    date: 'Mar 2',
    presentationPath: '/class-4-competitive-positioning/presentation',
    deSteps: '9-11',
    theme: 2,
  },
  {
    number: 5,
    title: 'Customer Acquisition & DMU',
    description: 'DE Steps 12-13 | Theme 3: How do they acquire?',
    date: 'Mar 9',
    presentationPath: '/class-5-customer-acquisition/presentation',
    deSteps: '12-13',
    theme: 3,
  },
  {
    number: 6,
    title: 'Business Model & Pricing',
    description: 'DE Steps 14-16 | Theme 4: How make money?',
    date: 'Mar 16',
    presentationPath: '/class-6-business-model/presentation',
    deSteps: '14-16',
    theme: 4,
  },
  {
    number: 7,
    title: 'Unit Economics: LTV & COCA',
    description: 'DE Steps 17-19 | Theme 4: How make money?',
    date: 'Mar 23',
    presentationPath: '/class-7-unit-economics/presentation',
    deSteps: '17-19',
    theme: 4,
  },
  {
    number: -1,
    title: 'Spring Break',
    description: 'No class',
    date: 'Mar 30',
    isBreak: true,
  },
  {
    number: -1,
    title: 'Spring Break',
    description: 'No class',
    date: 'Apr 6',
    isBreak: true,
  },
  {
    number: 8,
    title: 'Testing Assumptions & MVBP',
    description: 'DE Steps 20-23 | Theme 5: How design & build?',
    date: 'Apr 13',
    presentationPath: '/class-8-testing-mvbp/presentation',
    deSteps: '20-23',
    theme: 5,
  },
  {
    number: 9,
    title: 'Scale & Pitch Preparation',
    description: 'DE Step 24 | Theme 6: How do you scale?',
    date: 'Apr 20',
    presentationPath: '/class-9-scale-pitch/presentation',
    deSteps: '24',
    theme: 6,
  },
  {
    number: -1,
    title: 'Guest Speaker / Workshop',
    description: 'TBD',
    date: 'Apr 27',
    isBreak: true,
  },
  {
    number: 10,
    title: 'Final Pitches - Group A',
    description: '8-minute presentations + Q&A with judges',
    date: 'May 4',
    isSpecial: true,
  },
  {
    number: 11,
    title: 'Final Pitches - Group B',
    description: '8-minute presentations + Q&A with judges',
    date: 'May 11',
    isSpecial: true,
  },
];

/**
 * Course Configuration
 */
export const course: CourseConfig = {
  name: 'Applications in Entrepreneurship',
  code: 'HU4010',
  description: 'A systematic approach to building innovation-driven ventures',
  semester: 'Spring 2026',
  schedule: 'Monday Evenings, 6:15 - 7:55 PM',
  locations: ['Durham', 'Morganton'],
  instructors: [
    {
      name: 'Carl Ryden',
      title: 'Instructor',
    },
    {
      name: 'Chad Keister',
      title: 'Instructor',
    },
  ],
  sessions,
};

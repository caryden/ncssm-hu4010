/**
 * Tailwind CSS Configuration
 *
 * This config extends Tailwind with custom colors that match
 * the CSS custom properties defined in src/config/theme.ts
 *
 * NOTE: Institution branding colors should be changed in
 * src/config/institution.ts, not here. This file provides
 * Tailwind utility classes that reference those values.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Institution Branding (references CSS variables)
        brand: {
          primary: 'var(--brand-primary)',
          'primary-light': 'var(--brand-primary-light)',
          'primary-dark': 'var(--brand-primary-dark)',
          accent: 'var(--brand-accent)',
          'accent-light': 'var(--brand-accent-light)',
        },

        // Dark Mode Backgrounds
        dark: {
          bg: 'var(--dark-bg)',
          surface: 'var(--dark-surface)',
          card: 'var(--dark-card)',
          border: 'var(--dark-border)',
        },

        // Text Colors
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },

        // Status Colors
        status: {
          success: 'var(--success-green)',
          danger: 'var(--danger-red)',
          warning: 'var(--warning-yellow)',
        },

        // Theme Color (changes per-presentation)
        theme: {
          DEFAULT: 'var(--theme-color)',
          light: 'var(--theme-color-light)',
        },

        // DE Framework Theme Colors (for badges, indicators)
        de: {
          1: 'var(--theme-1-blue)',
          2: 'var(--theme-2-purple)',
          3: 'var(--theme-3-green)',
          4: 'var(--theme-4-amber)',
          5: 'var(--theme-5-red)',
          6: 'var(--theme-6-cyan)',
        },

        // Legacy aliases (for backward compatibility)
        'ncssm-blue': 'var(--brand-primary)',
        'ncssm-blue-light': 'var(--brand-primary-light)',
        gold: 'var(--brand-accent)',
        'gold-light': 'var(--brand-accent-light)',
      },

      // Typography
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      // Spacing for consistent layouts
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      // Border radius
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      // Transitions (match CSS variables)
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },

      // Animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease forwards',
        'fade-in-up': 'fadeInUp 0.3s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

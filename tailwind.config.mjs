/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'ncssm-blue': '#356093',
                'ncssm-blue-light': '#4a7ab8',
                'gold': '#d4a028',
                'gold-light': '#e8b84a',
                'dark-bg': '#0a0a0f',
                'dark-surface': '#12121a',
                'dark-card': '#1a1a24',
                'dark-border': '#2a2a3a',
                'text-primary': '#f1f1f1',
                'text-secondary': '#a0a0a0',
                'text-muted': '#6a6a7a',
                'theme-1-blue': '#356093',
                'theme-2-purple': '#7c3aed',
                'theme-3-green': '#059669',
                'theme-4-amber': '#f59e0b',
                'theme-5-red': '#ef4444',
                'theme-6-cyan': '#06b6d4',
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Georgia', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D9488',
          light: '#14B8A6',
          container: '#CCFBF1',
          on: '#FFFFFF',
          onContainer: '#134E4A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          variant: '#F0FDFA',
          container: '#FFFFFF',
        },
        muted: '#64748B',
        accent: '#EA580C',
        outline: '#CCFBF1',
        destructive: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(13, 148, 136, 0.08), 0 1px 2px rgba(13, 148, 136, 0.06)',
        elevated: '0 4px 12px rgba(13, 148, 136, 0.12), 0 2px 4px rgba(13, 148, 136, 0.06)',
      },
    },
  },
  plugins: [],
}
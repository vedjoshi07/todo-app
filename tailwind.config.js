/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          container: '#E0E7FF',
          on: '#FFFFFF',
          onContainer: '#312E81',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.7)',
          variant: '#F8FAFF',
          container: '#FFFFFF',
        },
        muted: '#64748B',
        accent: '#06B6D4',
        outline: 'rgba(99, 102, 241, 0.12)',
        destructive: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 1px 3px rgba(99, 102, 241, 0.06), 0 1px 2px rgba(99, 102, 241, 0.04)',
        'glass-lg': '0 8px 32px rgba(99, 102, 241, 0.10), 0 2px 8px rgba(99, 102, 241, 0.06)',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.tsx', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      flexDirection: {
        'row': 'row',
      },
      colors: {
        background: '#ffffff',
        foreground: '#1c1c1c',
        primary: {
          DEFAULT: '#1c1c1c',
          foreground: '#f0f0f0',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#1c1c1c',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#4b5563',
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#1c1c1c',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f0f0f0',
        },
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#1c1c1c',
        'shadow-15': 'rgba(0, 0, 0, 0.15)',
        'shadow-30': 'rgba(0, 0, 0, 0.3)',
        'shadow-50': 'rgba(0, 0, 0, 0.5)',
        'shadow-70': 'rgba(0, 0, 0, 0.7)',
        'white-shadow-15': 'rgba(256, 256, 256, 0.15)',
        'white-shadow-30': 'rgba(256, 256, 256, 0.30)',
        'white-shadow-50': 'rgba(256, 256, 256, 0.50)',
        'white-shadow-70': 'rgba(256, 256, 256, 0.70)',
      },
      borderRadius: {
        lg: 12,
        md: 10,
        sm: 8,
      },
      animation: {
        'bounce-up-down': 'bounce-up-down 0.8s infinite',
      },
      keyframes: {
        'bounce-up-down': {
          '0%, 100%': { transform: [{ translateY: 0 }] },
          '50%': { transform: [{ translateY: -8 }] },
        },
      },
    },
  },
  plugins: [
    function({addComponents}) {
      addComponents({
        '.flex': {
          display: 'flex',
          flexDirection: 'row',
        }
      })
    }
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: '#F7FAFA', // Soft off-white
                surface: '#FFFFFF',
                border: '#E6EEF0',
                primary: {
                    DEFAULT: '#0F172A', // Slate 900 for primary text
                    foreground: '#F8FAFC',
                    accent: '#0F8A7A', // Teal 600 - Brand Primary
                    hover: '#0D746A', // Teal 700
                    muted: '#94A3B8', // Slate 400
                },
                secondary: {
                    DEFAULT: '#475569', // Slate 600
                    foreground: '#F1F5F9', // Slate 100
                },
                mood: {
                    sad: '#E0F2FE', // Sky 100 (Blue-ish tint)
                    anxious: '#FEF3C7', // Amber 100 (Warm tint)
                    happy: '#FEF9C3', // Yellow 100 (Soft yellow)
                    calm: '#D1FAE5', // Emerald 100 (Mint)
                    surprise: '#E0E7FF', // Indigo 100 (Lavender)
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            }
        },
    },
    plugins: [],
}

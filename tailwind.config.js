/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                'safety-orange': '#FF5F15',
                'cyber-lime': '#CAFF33',
                'pure-black': '#000000',
                'muted-gray': '#A0A0A0',
                'dark-border': '#333333',
            },
            fontFamily: {
                heading: ['Archivo Black', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
            },
            letterSpacing: {
                'cli-heading': '0.1em',
                'cli-body': '0.05em',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "gradient-conic(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                'gradient': 'gradient 8s linear infinite',
            },
            keyframes: {
                'gradient': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

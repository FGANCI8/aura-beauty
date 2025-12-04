/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'white-ice': '#f7f7f7',
                'nude-rose': '#e6c9c9',
                'champagne-gold': '#e4d2a5',
                'black-elegant': '#222222',
                'gray-soft': '#9a9a9a',
            },
            fontFamily: {
                primary: ['var(--font-playfair)', 'serif'],
                secondary: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

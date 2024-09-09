/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
            mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            nova: ['Nova Mono', ...defaultTheme.fontFamily.mono],
        },
        extend: {},
    },
    plugins: [
        require('@flybywiresim/tailwind-config'),
    ]
}

'use strict';

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
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
        // eslint-disable-next-line global-require
        require('@flybywiresim/tailwind-config'),
    ],
};

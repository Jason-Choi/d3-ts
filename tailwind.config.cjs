/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.html",
        "./src/**/*.js",
        "./src/**/*.ts",
        "./index.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
}

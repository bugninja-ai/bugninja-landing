/** @type {import('tailwindcss').Config} */
const sharedConfig = require('../shared-ui/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    '../shared-ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}; 
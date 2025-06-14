/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Shared UI components
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.ts",
    // App package
    "../app/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "../app/lib/**/*.{js,ts,jsx,tsx,mdx}",
    // Landing package
    "../landing/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../landing/components/**/*.{js,ts,jsx,tsx,mdx}",
    "../landing/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          '50': '#f8f8f8',
          '100': '#f1f0ef',
          '200': '#e6e4e2',
          '300': '#d4d0cd',
          '400': '#b9b4b0',
          '500': '#a9a39e',
          '600': '#87807b',
          '700': '#706a65',
          '800': '#5e5a56',
          '900': '#514e4b',
          '950': '#2a2725',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} 
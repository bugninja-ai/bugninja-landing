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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          '50': '#eef1ff',
          '100': '#e1e5fe',
          '200': '#c8cffd',
          '300': '#a7affa',
          '400': '#8386f6',
          '500': '#6c66ee',
          '600': '#5c49e2',
          '700': '#4e3bc7',
          '800': '#4032a1',
          '900': '#3d348b',
          '950': '#221c4a',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          '50': '#fff7ec',
          '100': '#ffeed3',
          '200': '#ffd9a7',
          '300': '#ffbd6f',
          '400': '#ff9535',
          '500': '#ff770e',
          '600': '#f35b04',
          '700': '#c94205',
          '800': '#9f350d',
          '900': '#802d0e',
          '950': '#451405',
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
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222.2, 84%, 4.9%)",
        card: "hsl(0, 0%, 100%)",
        cardForeground: "hsl(222.2, 84%, 4.9%)",
        popover: "hsl(0, 0%, 100%)",
        popoverForeground: "hsl(222.2, 84%, 4.9%)",
        border: "hsl(240, 5%, 84%)",
        input: "hsl(240, 5%, 84%)",
        primary: "hsl(221, 83%, 53%)",
        primaryForeground: "hsl(0, 0%, 100%)",
        secondary: "hsl(220, 14%, 96%)",
        secondaryForeground: "hsl(222.2, 47.4%, 11.2%)",
        accent: "hsl(220, 14%, 96%)",
        accentForeground: "hsl(222.2, 47.4%, 11.2%)",
        destructive: "hsl(0, 84.2%, 60.2%)",
        destructiveForeground: "hsl(210, 40%, 98%)",
        ring: "hsl(221, 83%, 53%)",
        muted: "hsl(220, 14%, 96%)",
        mutedForeground: "hsl(215.4, 16.3%, 46.9%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

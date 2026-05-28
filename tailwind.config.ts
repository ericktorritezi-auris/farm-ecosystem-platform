import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        specgov: {
          navy: "var(--sg-navy)",
          cobalt: "var(--sg-cobalt)",
          "cobalt-hover": "var(--sg-cobalt-hover)",
          "cobalt-active": "var(--sg-cobalt-active)",
          "cobalt-tint": "var(--sg-cobalt-tint)",
          "cobalt-selected": "var(--sg-cobalt-selected)",
          graphite: "var(--sg-graphite)",
          "dark-slate": "var(--sg-dark-slate)",
          "dark-nav": "var(--sg-dark-nav)",
          "dark-surface": "var(--sg-dark-surface)",
          "dark-border": "var(--sg-dark-border)",
          "dark-text": "var(--sg-dark-text)",
          slate: "var(--sg-slate)",
          "slate-muted": "var(--sg-slate-muted)",
          "border-light": "var(--sg-border-light)",
          "input-border": "var(--sg-input-border)",
          "surface-0": "var(--sg-surface-0)",
          "surface-1": "var(--sg-surface-1)",
          "surface-2": "var(--sg-surface-2)",
          emerald: "var(--sg-emerald)",
          "emerald-tint": "var(--sg-emerald-tint)",
          amber: "var(--sg-amber)",
          "amber-tint": "var(--sg-amber-tint)",
          red: "var(--sg-red)",
          "red-tint": "var(--sg-red-tint)",
          cyan: "var(--sg-cyan)",
          "cyan-tint": "var(--sg-cyan-tint)",
          souyess: "var(--sg-souyess)"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist)", "var(--font-inter)", "Helvetica Neue", "sans-serif"],
        inter: ["var(--font-inter)", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Courier New", "monospace"]
      },
      fontSize: {
        display: ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.015em", fontWeight: "750" }],
        h1: ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.012em", fontWeight: "650" }],
        h2: ["1.0625rem", { lineHeight: "1.5rem", letterSpacing: "-0.005em", fontWeight: "650" }],
        h3: ["0.8125rem", { lineHeight: "1.25rem", fontWeight: "600" }],
        body: ["0.875rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        label: ["0.71875rem", { lineHeight: "1rem", letterSpacing: "0.055em", fontWeight: "500" }],
        caption: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.025em", fontWeight: "400" }],
        overline: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.13em", fontWeight: "600" }],
        code: ["0.8125rem", { lineHeight: "1.25rem", fontWeight: "500" }]
      },
      spacing: {
        sidebar: "240px",
        topbar: "48px"
      },
      borderRadius: {
        lg: "var(--radius-card)",
        md: "var(--radius-control)",
        sm: "var(--radius-badge)",
        xs: "var(--radius-small)"
      },
      boxShadow: {
        "sg-card": "0 1px 2px rgba(15, 30, 75, 0.04), 0 8px 24px rgba(15, 30, 75, 0.045)",
        "sg-button": "0 1px 1px rgba(15, 30, 75, 0.10), 0 8px 18px rgba(30, 78, 216, 0.16)",
        "sg-focus": "0 0 0 3px rgba(30, 78, 216, 0.16)"
      },
      transitionDuration: {
        sg: "140ms"
      }
    }
  },
  plugins: []
};

export default config;

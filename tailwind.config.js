/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans Variable', 'sans-serif'], 
      },
      colors: {
            "primary": "#9f3c16",
            "primary-container": "#bf542c",
            "on-primary": "#ffffff",
            "on-primary-container": "#fffbff",
            "primary-fixed": "#ffdbcf",
            "on-primary-fixed": "#390c00",
            "secondary": "#7f5700",
            "secondary-container": "#fdba45",
            "on-secondary": "#ffffff",
            "on-secondary-container": "#6f4b00",
            "tertiary": "#82502e",
            "tertiary-container": "#9f6843",
            "on-tertiary": "#ffffff",
            "surface": "#fbf9f5",
            "surface-dim": "#dbdad6",
            "surface-bright": "#fbf9f5",
            "surface-container-lowest": "#ffffff",
            "surface-container-low": "#f5f3ef",
            "surface-container": "#efeeea",
            "surface-container-high": "#eae8e4",
            "surface-container-highest": "#e4e2de",
            "on-surface": "#1b1c1a",
            "on-surface-variant": "#57423b",
            "outline": "#8a726a",
            "outline-variant": "#dec0b7",
            "error": "#ba1a1a",
            "error-container": "#ffdad6",
            "on-error": "#ffffff",
            "inverse-surface": "#30312e",
            "inverse-on-surface": "#f2f0ed"
          },
          borderRadius: {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "2xl": "1rem",
            "full": "9999px"
          },
          spacing: {
            "margin": "1rem",
            "gutter": "0.75rem",
            "space-xs": "0.25rem",
            "space-sm": "0.5rem",
            "space-md": "0.75rem",
            "space-lg": "1.25rem",
            "space-xl": "1.75rem"
          },
          fontFamily: {
            "headline-lg": ["Newsreader", "serif"],
            "headline-md": ["Newsreader", "serif"],
            "headline-sm": ["Newsreader", "serif"],
            "body-lg": ["Plus Jakarta Sans", "sans-serif"],
            "body-md": ["Plus Jakarta Sans", "sans-serif"],
            "body-sm": ["Plus Jakarta Sans", "sans-serif"],
            "label-md": ["Plus Jakarta Sans", "sans-serif"],
            "label-sm": ["Plus Jakarta Sans", "sans-serif"],
            "phonetic-display": ["Newsreader", "serif"]
          },
          fontSize: {
            "headline-lg": ["1.75rem", { "lineHeight": "2.25rem", "letterSpacing": "-0.015em", "fontWeight": "500" }],
            "headline-md": ["1.375rem", { "lineHeight": "1.875rem", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "headline-sm": ["1.125rem", { "lineHeight": "1.5rem", "fontWeight": "600" }],
            "body-lg": ["1rem", { "lineHeight": "1.625rem", "fontWeight": "400" }],
            "body-md": ["0.875rem", { "lineHeight": "1.375rem", "fontWeight": "400" }],
            "body-sm": ["0.75rem", { "lineHeight": "1.125rem", "fontWeight": "400" }],
            "label-md": ["0.8125rem", { "lineHeight": "1rem", "letterSpacing": "0.02em", "fontWeight": "600" }],
            "label-sm": ["0.6875rem", { "lineHeight": "0.875rem", "letterSpacing": "0.04em", "fontWeight": "700" }],
            "phonetic-display": ["0.9375rem", { "lineHeight": "1.25rem", "letterSpacing": "0.03em", "fontWeight": "400" }]
          }
    },
  },
  plugins: [],
}


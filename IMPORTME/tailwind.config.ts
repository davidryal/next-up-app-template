import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            lineHeight: '1.6',
            a: {
              color: '#3182ce',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
    scrollbar({ nocompatible: true }),
  ],
};
export default config;

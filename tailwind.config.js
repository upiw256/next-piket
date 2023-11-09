/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4586f7",

          "secondary": "#45ccd3",

          "accent": "#a51349",

          "neutral": "#1a191f",

          "base-100": "#eef1f6",

          "info": "#96bee4",

          "success": "#32e29e",

          "warning": "#f9da5d",

          "error": "#ea7f7b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

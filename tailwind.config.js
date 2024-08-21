import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(breadcrumbs|button|card|code|dropdown|input|kbd|link|listbox|navbar|select|skeleton|snippet|toggle|table|ripple|spinner|menu|divider|popover|scroll-shadow|checkbox|spacer).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

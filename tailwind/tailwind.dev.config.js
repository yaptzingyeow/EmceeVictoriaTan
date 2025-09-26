/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../**/*"],               // match everything in your site
  theme: {
    extend: {
      colors: {
        parchment: "#f3e7ca94",
        canvas: "#FFFFFF",
        wordcolor: "#3d5d7d",
        ink: "#1F2937",
        line: "#E7E5E4",
        whisper: "#F5F5F4",
        white: "#FFFFFF",
        accent: "#3F3F46",
        beige: "rgb(233 225 216)",
      },
      fontFamily: { header: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"] },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  safelist: [{ pattern: /.*/ }],      // ⬅️ include EVERYTHING
  // If Tailwind's reset breaks your old CSS, disable it for now:
  // corePlugins: { preflight: false },
}

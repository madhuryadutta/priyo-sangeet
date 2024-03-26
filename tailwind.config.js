module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"], // Enable purgeCSS to remove unused CSS in production
  darkMode: false, // Disable dark mode
  theme: {
    extend: {
      colors: {
        primary: "#FF6347", // Example of extending colors
        secondary: "#4682B4",
      },
      spacing: {
        72: "18rem", // Example of extending spacing
        84: "21rem",
        96: "24rem",
      },
    },
  },
  variants: {
    extend: {
      textShadow: ["responsive", "hover"], // Example of extending variants
    },
  },
  plugins: [
    // Enable additional plugins if needed
    // Example: require('@tailwindcss/typography'),
    // Example: require('@tailwindcss/forms'),
  ],
};

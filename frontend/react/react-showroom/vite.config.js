import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  test: {
    // Enables global test methods like describe, it, and expect without explicit imports
    globals: true,
    // Simulates a browser environment in Node.js
    environment: "jsdom",
    // Path to the test setup file
    setupFiles: "./src/tests/setup.js",
  },
});

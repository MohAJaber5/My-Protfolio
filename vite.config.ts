import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// 🔥 Important: Set base for GitHub Pages deployment
export default defineConfig(({ mode }) => ({
  base: "/My-Protfolio/"

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          react: ["react", "react-dom"],
          "react-router": ["react-router-dom"],
          "tanstack": ["@tanstack/react-query"],

          // Split UI libraries
          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip",
          ],

          // Split heavy components
          "monaco-editor": ["@monaco-editor/react"],
          "lottie": ["lottie-react"],
          "vanta": ["vanta"],

          // Split form libraries
          "forms": [
            "react-hook-form",
            "@hookform/resolvers",
            "zod",
          ],

          // Split utility libraries
          "utils": [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "lucide-react",
          ],

          // Split date/chart libraries
          "charts": ["recharts"],
          "dates": ["date-fns", "react-day-picker"],
        },
      },
    },
    // Prevent warnings for large chunk sizes since we split properly
    chunkSizeWarningLimit: 1000,
  },
}));

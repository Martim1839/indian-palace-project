import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,

  vite: {
    base: "/Indian-Palace-Project/",
  },

  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});

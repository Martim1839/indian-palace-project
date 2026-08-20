import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,

  vite: {
    base: "/indian-palace-project/",
  },

  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});

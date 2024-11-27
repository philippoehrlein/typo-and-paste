import { defineConfig } from "kirbyup/config";

export default defineConfig({
  alias: {
    "@components": "/src/components",
  },
  vite: {
    server: {
      port: 3000,
    },
  },
});

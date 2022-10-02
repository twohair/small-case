import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import defineOptions from "unplugin-vue-define-options/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue({
      reactivityTransform: true
    }),
    defineOptions(),
    Components({
      dts: "./types/components.d.ts",
      resolvers: [AntDesignVueResolver()]
    })
  ],
  resolve: {
    alias: {
      "/@": resolve(__dirname, "src"),
      "/#": resolve(__dirname, "types")
    }
  }
});

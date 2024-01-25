import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
import vitePluginStyleVwLoader from "vite-plugin-style-vw-loader";
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';
import AutoImport from 'unplugin-auto-import/vite'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    /***
     * 转换标签样式单位: px -> rem
     */
    vitePluginStyleVwLoader({
      unitToConvert: "px",
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      minPixelValue: 1,
    }),
    vue(),
    Components({
      resolvers: [VantResolver()],
      dirs: ['src/components/global']
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: file => {
            let num = 1920;
            if (file.indexOf('m_') !== -1) {
              num = 375;
            }
            return num;
          },
          unitPrecision: 5,
          viewportUnit: "vw",
          fontViewportUnit: "vw",
          minPixelValue: 1,
          exclude: [/node_modules/],
        }),
      ],
    }
  }
});

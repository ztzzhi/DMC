import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { wrapperEnv } from "./src/utils/handleEnv"
import { createHtmlPlugin } from "vite-plugin-html"
import eslintPlugin from "vite-plugin-eslint"
// import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression"
import vitePluginImp from 'vite-plugin-imp'

export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // https: false,
      proxy: {
        "/api": {
          target: "http://testapp.tt114.com",
          changeOrigin: true,
        }
      }
    },
    css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					additionalData: `@import "@/styles/var.less";`
				}
			}
		},
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      eslintPlugin(),
      createHtmlPlugin({
        inject: {
          data: {
            title: "设备管理中心"
          }
        }
      }),
      // // * 是否生成包预览
      // viteEnv.VITE_REPORT && visualizer({
      //   emitFile: true,
      //   filename: "report.html",
      // }),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz"
        })
    ],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    // build configure
    build: {
      outDir: "build",
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      minify: "esbuild",
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  }
})

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

console.log(process.env.BASE)
export default defineConfig({
  mode: process.env.NODE_ENV,
  publicDir: "public",
  plugins: [reactRefresh()],
  server: {
    open: "./index.html",
    proxy: {
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

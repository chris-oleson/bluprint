import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, import.meta.dirname);
    return {
        server: {
            port: env.VITE_PORT
        },
        plugins: [
            vue(),
        ],
        resolve: {
            extensions: ['.js', '.vue'],
        },
        build: {
            assetsDir: 'build-assets'
        }
    }
})

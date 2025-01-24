import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    define: {
        'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_API_KEY)
    },
    server: {
        host: true,
        strictPort: true,
        watch: {
            usePolling: true,
        },
    },
})

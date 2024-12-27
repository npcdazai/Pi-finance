import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/backend': {
                target: 'https://staging.getpi.in',
                changeOrigin: true,
                secure: false, // Use `true` if the server uses SSL and has a valid certificate
                rewrite: (path) => path.replace(/^\/backend/, ''),
            },
        },
    },
});

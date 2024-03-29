import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({

    plugins: [
        laravel({
            input: [
                'resources/js/index.tsx',
                'resources/sass/app.scss'
            ],
            refresh: true,
        }),
        react({
            fastRefresh: false
        })
    ],
    server: {
        watch: {
            usePolling: true
        },
        hmr: {
            host: 'localhost'
        }
    }

});

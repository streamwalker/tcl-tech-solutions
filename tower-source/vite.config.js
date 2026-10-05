import {defineConfig} from 'vite';
import {readdirSync} from 'node:fs';
export default defineConfig({base:'./',build:{chunkSizeWarningLimit:650,rollupOptions:{input:readdirSync('.').filter(p=>p.endsWith('.html'))}}});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        // Example alias if you use `@` to refer to your `src` directory
        // Adjust this if your project structure or alias needs are different
        '@': path.resolve(__dirname, './'), // Assuming the project root is 'src/' implicitly
      },
    },
    // If you need to specify a different output directory for Vercel
    // build, you can do it here, e.g.:
    // build: {
    //   outDir: 'dist',
    // },
  };
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [
    react(),
    {
      name: 'source-entry-in-development',
      apply: 'serve',
      transformIndexHtml(html) {
        return html.replace('  <link rel="stylesheet" href="./assets/site.css">\n', '')
          .replace('./assets/site.js', './src/main.jsx');
      }
    }
  ],
  build: {
    // The existing GitHub Pages deployment serves the repository root.
    outDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: false,
    rolldownOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'site.js',
        assetFileNames: asset => asset.names.some(name => name.endsWith('.css'))
          ? 'site.css'
          : '[name]-[hash][extname]'
      }
    }
  }
});

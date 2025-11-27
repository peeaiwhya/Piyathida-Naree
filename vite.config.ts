import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Fix: Cast process to any to avoid TS error about missing cwd() method
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY so it works with the @google/genai SDK guidelines
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY)
    }
  }
})
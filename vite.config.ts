import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // Exclude the data/ folder — large video/audio files cause EBUSY on Windows
      ignored: [
        `${import.meta.dirname}/data/**`,
      ],
    },
  },
})


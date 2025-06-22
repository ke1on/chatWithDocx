// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@nuxt/icon'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  rootDir: './src',
  css: ['~/assets/css/main.css'],
})

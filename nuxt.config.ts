// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: [
    '~/plugins/toast.client.ts', 
  ],
  modules: ['@nuxtjs/tailwindcss',
    '@pinia/nuxt'],
    
  
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
      authRedirect: '/auth/login',
      apiEndpoints: {
        resetPassword: '/send-email/reset-password',
      }
    }
  },
  


  
})

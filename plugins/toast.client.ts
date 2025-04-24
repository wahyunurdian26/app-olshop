// plugins/toast.client.ts
import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
    
  }

  nuxtApp.vueApp.use(Toast, options)
})

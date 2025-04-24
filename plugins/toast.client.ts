import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
  }

  nuxtApp.vueApp.use(Toast, options)

  // Ini yang benar:
  const toast = useToast()

  return {
    provide: {
      toast,
    }
  }
})

import Toast, * as ToastModule from 'vue-toastification'
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

  return {
    provide: {
      useToast: ToastModule.useToast
    }
  }
})

export const useToastSafe = () => {
    return useNuxtApp().$toast as ReturnType<typeof import('vue-toastification').useToast>
  }
  
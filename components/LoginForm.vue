<template>
  <div class="w-full max-w-xs mx-auto mt-10">
    <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <!-- Email -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        <p v-if="errorMsg" class="text-red-500 text-xs italic text-center">{{ errorMsg }}</p>
      </div>

      <!-- Login Button -->
      <div class="flex items-center justify-between mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <!-- Forgot Password link -->
        <router-link to="/auth/forgot-password" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          Lupa Password?
        </router-link>
      </div>

      <!-- Divider -->
      <div class="flex items-center mb-4">
        <div class="flex-1 border-t border-gray-300"></div>
        <div class="px-3 text-gray-500">atau</div>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- Google Login Button -->
      <div class="mb-4">
        <button
          @click="loginWithGoogle"
          type="button"
          class="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Login with Google
        </button>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2025 Campaign App. All rights reserved.
    </p>
  </div>
</template>
<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth' // Asumsi kamu menggunakan Pinia atau Vuex


// Toast untuk notifikasi
const toast = useToast()
const router = useRouter()

// Ref untuk input email dan password
const email = ref('')
const password = ref('')
const errorMsg = ref('')

// Token disimpan di cookie
const tokenCookie = useCookie<string>('token', {
  maxAge: 60 * 60 * 24 * 7,  // Token berlaku selama 7 hari
  secure: true,
  sameSite: 'strict',
})

// Fungsi untuk login
const handleLogin = async () => {
  errorMsg.value = ''

  try {
    // Kirim request login ke backend
    const res = await fetch(`${useRuntimeConfig().public.apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    const data = await res.json()
    const token = data?.data?.token  // Ambil token dari data.data.token
    const user = data?.data?.user    // (Opsional) Ambil user info jika dibutuhkan

    if (res.ok && token) {
      const auth = useAuthStore()
      auth.login(token) // Simpan token dan user di store

      const tokenCookie = useCookie('token')
      tokenCookie.value = token // Simpan token di cookie

      toast.success('Welcome!')
      await router.push('/dashboard')
    } else {
      errorMsg.value = data?.message || 'Login failed. Please try again.'
      toast.error(errorMsg.value)
    }
  } catch (err) {
    console.error(err)
    errorMsg.value = 'An error occurred. Please try again.'
    toast.error(errorMsg.value)
  }
}


// Fungsi untuk login dengan Google
const loginWithGoogle = async () => {
  try {
    // Arahkan pengguna ke endpoint login Google di backend
    const res = await fetch(`${useRuntimeConfig().public.apiBase}/auth/google`, {
      method: 'GET',
    })

    if (!res.ok) {
      // Menangani error jika response tidak OK
      toast.error('Failed to initiate Google login.')
      console.error('Error:', res.status, res.statusText)
      return
    }

    const data = await res.json()
    console.log('Received data:', data) // Cek data yang diterima

    if (data?.data?.url) {
      // Redirect ke halaman login Google
      window.location.href = data.data.url
    } else {
      toast.error('No redirect URL found.')
    }
  } catch (err) {
    console.error('An error occurred during Google login:', err)
    toast.error('An error occurred during Google login.')
  }
}



</script>

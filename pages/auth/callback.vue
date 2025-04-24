<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const toast = useToast()

const token = route.query.token as string

if (token) {
  auth.login(token)
  toast.success('Login berhasil dengan Google!')
  router.push('/dashboard')
} else {
  toast.error('Token tidak ditemukan dari Google login!')
  router.push('/auth')
}
</script>

<template>
  <div class="p-8 text-center">
    <p class="text-lg">Logging in with Google...</p>
  </div>
</template>

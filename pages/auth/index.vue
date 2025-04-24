<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoginForm />
    </div>
  </template>
  
  <script setup>
  definePageMeta({
  layout: false
})
  import LoginForm from '~/components/LoginForm.vue'
  </script>
  
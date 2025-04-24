<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="" alt="Logo" class="h-10">
        <span class="ml-2 text-xl font-bold text-gray-800">UrbanNest</span>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8">
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 font-medium" active-class="text-blue-600">Home</NuxtLink>
        <NuxtLink to="/products" class="text-gray-600 hover:text-gray-900 font-medium" active-class="text-blue-600">Products</NuxtLink>
        <NuxtLink to="/categories" class="text-gray-600 hover:text-gray-900 font-medium" active-class="text-blue-600">Categories</NuxtLink>
        <NuxtLink to="/about" class="text-gray-600 hover:text-gray-900 font-medium" active-class="text-blue-600">About</NuxtLink>
      </nav>

      <!-- Search, Cart and User -->
      <div class="flex items-center space-x-4">
        <div class="relative hidden md:block">
          <input type="text" placeholder="Search products..." class="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <NuxtLink to="/cart" class="relative p-2 text-gray-600 hover:text-gray-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span v-if="cartCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ cartCount }}
          </span>
        </NuxtLink>

        <!-- User dropdown -->
        <div class="relative">
          <button @click="userMenuOpen = !userMenuOpen" class="p-2 text-gray-600 hover:text-gray-900 flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
          <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <NuxtLink to="/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="userMenuOpen = false">My Account</NuxtLink>
            <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="userMenuOpen = false">My Orders</NuxtLink>
            <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>

        <button class="md:hidden p-2 text-gray-600 hover:text-gray-900" @click="toggleMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
      <div class="container mx-auto px-4 py-2 flex flex-col space-y-2">
        <NuxtLink to="/" class="py-2 text-gray-600 hover:text-gray-900" active-class="text-blue-600" @click="mobileMenuOpen = false">Home</NuxtLink>
        <NuxtLink to="/products" class="py-2 text-gray-600 hover:text-gray-900" active-class="text-blue-600" @click="mobileMenuOpen = false">Products</NuxtLink>
        <NuxtLink to="/categories" class="py-2 text-gray-600 hover:text-gray-900" active-class="text-blue-600" @click="mobileMenuOpen = false">Categories</NuxtLink>
        <NuxtLink to="/about" class="py-2 text-gray-600 hover:text-gray-900" active-class="text-blue-600" @click="mobileMenuOpen = false">About</NuxtLink>
        <div class="relative py-2">
          <input type="text" placeholder="Search products..." class="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div class="border-t pt-2">
          <NuxtLink to="/account" class="block py-2 text-gray-600 hover:text-gray-900" @click="mobileMenuOpen = false">My Account</NuxtLink>
          <button @click="handleLogout" class="w-full text-left py-2 text-gray-600 hover:text-gray-900">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'

const $toast = useToastSafe()

const auth = useAuthStore()




const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleLogout = () => {
  auth.logout()
  $toast.success('You have been logged out')
  navigateTo('/auth')
}
</script>

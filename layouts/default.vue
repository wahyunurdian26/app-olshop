<template>
    <div class="min-h-screen flex flex-col">
      <LayoutsHeader />
      <main class="flex-grow">
        <slot />
      </main>
      <LayoutsFooter />
    </div>
  </template>
  
  <script setup>
  </script>
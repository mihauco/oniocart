<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
  useHead({
  title: 'Oniocart',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    link: [
      { 
        rel: 'preconnect', 
        href: 'https://fonts.googleapis.com'
      },
      { 
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600&display=swap', 
        crossorigin: '' 
      },
      { 
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', 
        crossorigin: '' 
      }
    ]
  })
</script>

<style lang="scss">
  @import '~/assets/styles/variables.scss';
  @import '~/assets/styles/global.scss';
</style>

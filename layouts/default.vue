<template>
  <div class="layout-default">
    <div class="layout-default__wrapper">
      <Header class="layout-default__header" />
      <main class="layout-default__main">
        <slot />
      </main>
    </div>
    <Cart />
    <Footer />
    <LoadingOverlay v-if="showOverlay"/>
    <AddedToCartDialog />
  </div>
</template>

<script setup lang="ts">
  import Header from '~/components/Header.vue'
  import Cart from '~/components/Cart.vue'
  import Footer from '~/components/Footer.vue'
  import LoadingOverlay from '~/components/LoadingOverlay.vue'
  import AddedToCartDialog from '~/components/AddedToCartDialog.vue'
  import { useMainStore } from '~/store/main'
  
  const mainStore = useMainStore()

  const showOverlay = computed(() => {
    return mainStore.searchPending || mainStore.addToCartPending
  })
</script>

<style lang="scss">
  .layout-default {
    &__wrapper {
      width: 100%;
      padding-right: var(--cart-fixed-width);
    }

    &__main {
      padding: var(--space-big);
    }
  }
</style>
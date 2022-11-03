<template>
  <div class="steps">
    <div class="steps__step-transition steps__step-transition--enter">

    </div>
    <Transition
      name="fade-left"
    >
      <SearchProduct
        v-if="view === 'SEARCH'"
      />
    </Transition>
    <Transition
      :name="view === 'SEARCH' ? 'fade-right' : 'fade-left'"
    >
      <SearchResults
        v-if="view === 'SELECT_PRODUCT'"
      />
    </Transition>
    <Transition
      name="fade-right"
    >
      <Comparison
        v-if="view === 'COMPARISON'"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { useMainStore } from '~/store/main'
  import SearchProduct from '~/components/SearchProduct.vue'
  import SearchResults from '~/components/SearchResults.vue'
  import Comparison from '~/components/Comparison.vue'

  const mainStore = useMainStore()
  const view = computed(() => mainStore.view)
</script>

<style lang="scss">
  .steps {
    position: relative;
  }

  .fade-left-enter-active,
  .fade-left-leave-active,
  .fade-right-enter-active,
  .fade-right-leave-active {
    transition: opacity .3s, transform .3s;
    position: absolute;
  }

  .fade-left-enter-from,
  .fade-left-leave-to {
    opacity: 0;
    transform: translateX(-200px);
  }

  .fade-right-enter-from,
  .fade-right-leave-to {
    opacity: 0;
    transform: translateX(200px);
  }
</style>
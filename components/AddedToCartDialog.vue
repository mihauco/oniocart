<template>
  <Dialog v-if="show">
    <template #text>
      {{ $t('cart.productSuccessfullyAdded') }}
    </template>
    <template #buttons>
      <OnioButton
        @click="goBackToSearch"
        alt
      >
        {{ $t('button.backToSearch') }}
      </OnioButton>
      <OnioButton
        v-if="showCompareButton"
        @click="compareProducts"
        alt
      >
        {{ $t('button.compare') }}
      </OnioButton>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import Dialog from '~/components/Dialog.vue'
  import OnioButton from '~/components/OnioButton.vue'
  import { useMainStore } from '~/store/main'

  const mainStore = useMainStore()

  const show = computed(() => {
    return mainStore.showAddedToCartDialog
  })

  const showCompareButton = computed(() => {
    return mainStore.cartSets.length > 1
  })

  const goBackToSearch = () => {
    mainStore.goBackToSearch()
  }

  const compareProducts = () => {
    mainStore.compareProducts()
  }
</script>
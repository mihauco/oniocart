<template>
  <span class="price">
    {{ priceFormatted }}
  </span>
</template>

<script setup lang="ts">
  const currencyMap = {
    'PLN': 'zł'
  }

  const props = defineProps<{
    price: number,
    currency: string
  }>()

  const priceFormatted = computed(() => {
    return `${props.price.toFixed(2).replace('.', ',')}` + ` ${currencyMap[props.currency]}`
  })
</script>
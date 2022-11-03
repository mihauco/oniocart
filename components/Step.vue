<template>
  <div class="step">
    <h1 class="step__name">{{ name }}</h1>
    <p class="step__description">{{ description }}</p>
    <div class="step__content">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    name: string,
    description: string
  }>()
</script>

<style lang="scss">
  .step {
    width: 100%;
    max-width: var(--step-width);

    &__name {
      margin: 0 0 var(--space-big) 0;
      padding: 0;
      font-size: var(--font-size-large);
      font-weight: var(--font-weight-bold);
    }

    &__description {
      margin: 0 0 var(--space-big) 0;
      padding: 0;
      font-size: var(--font-size-regular);
    }
  }
</style>
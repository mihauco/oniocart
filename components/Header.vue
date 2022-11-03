<template>
  <header class="header">
    <div class="header__inner">
      <Logo class="header__logo" />
    </div>
  </header>
</template>

<script setup lang="ts">
  import Logo from '~/components/Logo.vue';
</script>

<style lang="scss">
  .header {
    padding: var(--space-big);

    &__inner {
      padding-bottom: var(--space-small);
      border-bottom: var(--border-size-main) solid var(--border-color-main)
    }
  }
</style>
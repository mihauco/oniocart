<template>
  <ul
    class="list"
    :class="{
      'list--alt': alt
    }"
  >
    <li
      class="list__item"
      v-for="item in items"
      :key="item.id"
    >
      <slot
        name="item"
        v-bind="item"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      alt?: boolean,
      items: any[]   
    }>(),
    {
      alt: false
    }
  )
</script>

<style lang="scss">
  .list {
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      padding-bottom: var(--space-small);
      margin-bottom: var(--space-regular);
      border-bottom: var(--border-size-main) solid var(--border-color-main);

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: 0;
      }
    }
  }
</style>
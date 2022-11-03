<template>
  <div class="square-image">
    <img
      v-if="typeof image === 'string'"
      :src="image"
      class="square-image__image"
    >
    <template v-else-if="Array.isArray(image)">
      <component
        v-for="n in 4"
        :key="n"
        class="square-image__image square-image__image--quarter"
        :class="{
          'square-image__image--empty': !image[n - 1],
          'square-image__image--more': n === 4 && image.length > 4
        }"
        :is="(n === 4 && image.length > 4) || !image[n - 1] ? 'div' : 'img'"
        :src="image[n - 1]"
      >
        <span v-if="n === 4 && image.length > 4">+{{image.length - 3}}</span>
      </component> 
    </template>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    image: string | string[]
  }>()
</script>

<style lang="scss">
  .square-image {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    position: relative;
    
    &__image {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      padding: var(--space-small);
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: var(--product-image-background);
      border-radius: var(--border-radius-big);

      &--quarter {
        width: calc(50% - 2px);
        height: calc(50% - 2px);
        border-radius: var(--border-radius-regular);
        padding: var(--space-tiny);

        &:nth-child(1) {
          top: 0;
          left: 0;
        }

        &:nth-child(2) {
          top: 0;
          right: 0;
          left: auto;
        }

        &:nth-child(3) {
          bottom: 0;
          left: 0;
          top: auto;
        }

        &:nth-child(4) {
          bottom: 0;
          right: 0;
          left: auto;
          top: auto
        }
      }

      &--empty,
      &--more {
        background-color: transparent;
        border: var(--border-size-main) solid var(--border-color-alt);
        border-radius: var(--border-radius-regular);
      }

      &--more {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
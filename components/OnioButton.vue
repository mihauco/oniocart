<template>
  <component
    :is="href ? 'a' : 'button'"
    class="button"
    :class="{
      'button--disabled': disabled,
      'button--alternative': alt
    }"
    @click="clickHandler"
    :href="href"
    :target="target"
  >
    <span class="button__label">
      <slot/>
    </span>
  </component>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      href?: string,
      disabled?: boolean,
      alt?: boolean,
      target?: '_self' | '_blank'
    }>(),
    {
      href: '',
      disabled: false,
      alt: false
    }
  )

  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
  }>()

  const clickHandler = (event: MouseEvent) => {
    emit('click', event)
  }
</script>

<style lang="scss">
  .button {
    font-family: var(--font-family);
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-regular);
    color: var(--text-color-main);
    border: var(--border-size-thick) solid var(--border-color-button);
    border-radius: var(--border-radius-regular);
    padding: var(--space-small) var(--space-medium);
    background-color: var(--background-button);
    display: inline-block;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    text-decoration: none;

    &:visited {
      color: var(--text-color-main);
    }

    &:hover {
      color: var(--text-color-alt);

      &::before {
        transform: translateX(0);
      }
    }

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      width: 100%;
      height: 100%;
      transition: transform .2s, color .2s;
      background-color: var(--background-button-hover);
    }

    &--alternative {
      color: var(--text-color-alt);
      border: var(--border-size-thick) solid var(--border-color-button-alt);
      background-color: var(--background-button-alt);

      &:visited {
        color: var(--text-color-alt);
      }

      &:hover {
        color: var(--text-color-main);
      }

      &::before {
        background-color: var(--background-button-hover-alt);
      }
    }

    &__label {
      position: relative;
      z-index: 2;
    }
  }
</style>
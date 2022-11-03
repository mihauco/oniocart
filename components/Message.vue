<template>
  <div class="message">
    <slot/>
    <span
      class="message__close"
      @click="clickHandler"
    ></span>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const clickHandler = () => {emit('close')}
</script>

<style lang="scss">
  .message {
    background-color: var(--error);
    font-size: var(--font-size-small);
    color: var(--text-color-alt);
    padding: var(--space-tiny) var(--space-small);
    border-radius: var(--border-radius-large);
    position: relative;

    &__close {
      cursor: pointer;
      position: absolute;
      top: var(--space-tiny);
      right: var(--space-tiny);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: var(--message-close-button-background);

      &::before,
      &::after {
        content: '';
        width: 2px;
        height: 10px;
        background-color: var(--message-close-button-icon-color);
        position: absolute;
        top: 4px;
        left: 8px
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }
</style>
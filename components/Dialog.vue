<template>
  <div class="dialog">
    <div class="dialog__text">
      <slot name="text" />
    </div>
    <div class="dialog__buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<style lang="scss">
  .dialog {
    max-width: calc(100% - (2 * var(--space-regular)));
    width: var(--dialog-size);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--zindex-dialog-window);
    background-color: var(--background-alt);
    border-radius: var(--border-radius-big);
    padding: var(--space-regular);
    color: var(--text-color-alt);

    &__buttons {
      margin-top: var(--space-small);
      padding-top: var(--space-small);
      border-top: var(--border-size-main) solid var(--border-color-alt);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
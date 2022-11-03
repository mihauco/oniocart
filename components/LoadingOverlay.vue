<template>
  <div class="loading-overlay">
    <div class="loading-overlay__spinner">
      <span/>
    </div>
  </div>
</template>

<style lang="scss">
  .loading-overlay {
    position: fixed;
    z-index: var(--zindex-loading-layer);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, .8);
    display: flex;
    justify-content: center;
    align-items: center;

    &__spinner {
      width: var(--loader-spinner-point-size);
      height: var(--loader-spinner-point-size);
      position: relative;

      span,
      &::before,
      &::after {
        display: block;
        width: var(--loader-spinner-point-size);
        height: var(--loader-spinner-point-size);
        border-radius: 50%;
        background-color: var(--background-alt);
        animation: jumpingDot 1s infinite;
      }

      span {
        animation-delay: .1s;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
      }

      &::before {
        right: 100%;
        margin-right: var(--space-tiny);
      }

      &::after {
        left: 100%;
        margin-left: var(--space-tiny);
        animation-delay: .2s;
      }

      @keyframes jumpingDot {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(calc(1.5 * var(--loader-spinner-point-size)));
        }

        100% {
          transform: translateY(0);
        }
      }
    }
  }
</style>
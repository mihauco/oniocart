<template>
  <div class="logo">
    <img src="~/assets/images/onion.svg" class="logo__onion"/>
    <span class="logo__text">niocart</span>
  </div>
</template>

<style lang="scss">
  .logo {
    height: var(--logo-height);
    position: relative;
    padding-left: 40px;

    &__onion {
      display: block;
      width: var(--logo-height);
      position: absolute;
      top: 0;
      left: 0;
    }

    &__text {
      font-size: 50px;
      line-height: 1;
      position: relative;
      top: -9px;
      font-weight: var(--font-weight-thin);
    }
  }
</style>
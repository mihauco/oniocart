<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <SquareImage
        :image="image"
      />
    </div>
    <div class="product-card__info">
      <div class="product-card__name">{{ name }}</div>
      <div class="product-card__price">
        {{ isFromPrice ? $t('productCard.priceFrom') : '' }}
        <Price
          :price="price"
          :currency="currency"
        />
      </div>
      <div class="product-card__button-slot">
        <slot name="button"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Price from '~/components/Price.vue';
  import SquareImage from '~/components/SquareImage.vue';

  const props = withDefaults(
    defineProps<{
      image: string | string[],
      name: string,
      isFromPrice: boolean,
      price: number,
      currency: string
    }>(),
    {
      isFromPrice: false
    }
  )
</script>

<style lang="scss">
  .product-card {
    display: flex;
    justify-content: space-between;

    &__image-wrapper {
      width: 25%;
    }

    &__info {
      width: 75%;
      padding-left: var(--space-regular);
      display: flex;
      flex-direction: column;
    }

    &__name {
      font-size: var(--font-size-big);
    }

    &__price {
      margin-top: var(--space-small);
    }

    &__button-slot {
      margin-top: auto;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
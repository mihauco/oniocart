<template>
  <details class="store-offer">
    <summary class="store-offer__details">
      <div class="store-offer__image-wrapper">
        <SquareImage
          :image="storeImage"
        />
      </div>
      <span class="store-offer__name">{{ storeName }}</span>
      <Price
        class="store-offer__total-price"
        :price="totalPrice"
        :currency="currency"
      />
    </summary>
    <List
      class="store-offer__products-list"
      :items="products"
    >
      <template #item="product">
        <ProductCard
          class="store-offer__product"
          :image="product.image.default"
          :price="product.priceMin"
          :is-from-price="false"
          :name="product.name"
          :currency="product.currency"
        >
          <template #button>
            <OnioButton
              v-if="product.productUrl"
              :href="product.productUrl"
              target="_blank"
            >
              {{ $t('button.goToProduct') }}
            </OnioButton>
          </template>
        </ProductCard>
      </template>
    </List>
  </details>
</template>

<script setup lang="ts">
  import Price from '~/components/Price.vue';
  import ProductCard from '~/components/ProductCard.vue';
  import Product from '~/types/Product';
  import List from '~/components/List.vue'
  import SquareImage from '~/components/SquareImage.vue';
  import OnioButton from '~/components/OnioButton.vue';

  const props = defineProps<{
    storeImage: string,
    storeName: string,
    totalPrice: number,
    currency: string,
    products: Product[]
  }>()
</script>

<style lang="scss">
  .store-offer {
    &__details {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
    }

    &__image-wrapper {
      flex: 0 0 25%;
    }

    &__name {
      margin: 0 var(--space-regular)
    }

    &__total-price {
      font-size: var(--font-size-big);
      font-weight: var(--font-weight-bold);
      margin-left: auto;
    }

    &__products-list {
      padding: var(--space-big) 0 var(--space-big) calc(2 * var(--space-big));
    }
  }
</style>
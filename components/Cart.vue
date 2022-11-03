<template>
  <div class="cart">
    <div class="cart__header">
      {{ $t('cart.title') }}
    </div>
    <div
      v-if="cartSets.length"
      class="cart__products"
    >
      <List :items="cartSets">
        <template #item="set">
          <ProductCard
            class="cart__product"
            :image="set.images"
            :name="set.name"
            :price="set.price"
            :is-from-price="true"
            :currency="set.currency"
          >
            <template #button>
              <OnioButton
                alt
                @click="removeProduct(set.id)"
              >
                {{ $t('button.removeProduct') }}
              </OnioButton>
            </template>
          </ProductCard>
        </template>
      </List>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMainStore } from '~/store/main'
  import ProductCard from '~/components/ProductCard.vue';
  import OnioButton from '~/components/OnioButton.vue';
  import List from '~/components/List.vue'

  const mainStore = useMainStore()
  const cartSets = computed(() => {
    return mainStore.cartSets.map((set) => {
      const setLowerPrice = set.products.reduce((price, product) => {
        if (price === 0 || product.data.priceMin < price) {
          return product.data.priceMin
        }

        return price
      }, 0)

      return {
        name: set.name,
        id: set.id,
        images: set.products.map(product => product.data.image.default),
        price: setLowerPrice,
        currency: 'PLN'
      }
    })
  })

  const removeProduct = (setId) => {
    mainStore.removeSetFromCart(setId)
  }
</script>

<style lang="scss">
  .cart {
    position: fixed;
    top: 0;
    right: 0;
    width: var(--cart-fixed-width);
    height: 100vh;
    background-color: var(--background-alt);
    color: var(--text-color-alt);
    padding: var(--space-big);

    &__header {
      height: 52px;
      padding-bottom: var(--space-small);
      margin-bottom: var(--space-big);
      border-bottom: var(--border-size-main) solid var(--border-color-alt);
      display: flex;
      align-items: center;
    }
  }
</style>
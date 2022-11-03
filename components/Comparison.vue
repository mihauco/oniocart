<template>
  <Step
    :name="$t('step.comparison.name')"
    :description="bestOffers.length ? $t('step.comparison.description.success') : $t('step.comparison.description.fail')"
  >
    <div class="comparison">
      <List :items="bestOffers">
        <template #item="offer">
          <StoreOffer
            class="comparison__store-offer"
            :store-name="offer.storeName"
            :store-image="offer.storeImage.default"
            :total-price="offer.totalPrice"
            :currency="offer.currency"
            :products="offer.products"
          />
        </template>
      </List>
      <div class="comparison__buttons">
        <OnioButton
          @click="goBackToSearch"
        >
          {{ $t('button.backToSearch') }}
        </OnioButton>
        <OnioButton
          @click="resetCart"
        >
          {{ $t('button.resetCart') }}
        </OnioButton>
      </div>
    </div>
  </Step>
</template>

<script setup lang="ts">
  import { useMainStore } from '~~/store/main';
  import Step from '~/components/Step.vue';
  import StoreOffer from '~/components/StoreOffer.vue';
  import List from '~/components/List.vue';
  import OnioButton from '~/components/OnioButton.vue';

  const mainStore = useMainStore()
  const bestOffers = computed(() => mainStore.bestOffers)

  const goBackToSearch = () => {
    mainStore.goBackToSearch()
  }
  const resetCart = () => {
    mainStore.resetCart()
  }
</script>

<style lang="scss">
  .comparison {
    &__buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: var(--space-big);
    }
  }
</style>
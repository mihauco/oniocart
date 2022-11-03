<template>
  <Step
    :name="$t('step.searchresults.name')"
    :description="$t('step.searchresults.description')"
  >
    <div class="search-results">
      <List :items="searchResults">
        <template #item="product">
          <div class="search-results__result-wrapper">
            <OnioCheckbox
              class="search-results__checkbox"
              :value="product.id"
              v-model="selectedProducts"
            />
            <ProductCard
              class="search-results__product-card"
              :image="product.image.default"
              :name="product.name"
              :is-from-price="true"
              :price="product.priceMin"
              :currency="product.currency"
            />
          </div>
        </template>
      </List>
      <div class="search-results__buttons">
        <Message
          class="search-results__error-message"
          v-if="messageText"
          @close="closeMessageHandler"
        >
          {{messageText}}
        </Message>
        <OnioButton
          @click="backToSearch"
        >
          {{ $t('button.backToSearch') }}
        </OnioButton>
        <OnioButton
          @click="addSetToCartHandler"
        >
          {{ $t('button.addSetToCart') }}
        </OnioButton>
      </div>
    </div>
  </Step>
</template>

<script setup lang="ts">
  import { useMainStore } from '~/store/main'
  import { useI18n } from 'vue-i18n'
  import Step from '~/components/Step.vue'
  import List from '~/components/List.vue'
  import ProductCard from '~/components/ProductCard.vue'
  import OnioButton from '~/components/OnioButton.vue'
  import OnioCheckbox from '~/components/OnioCheckbox.vue'
  import Message from '~/components/Message.vue'
  
  const mainStore = useMainStore()
  const { t } = useI18n()
  const searchResults = computed(() => mainStore.searchResults)
  const selectedProducts = ref([])
  const messageText = ref('')

  const backToSearch = () => {
    mainStore.$patch({view: 'SEARCH'})
  }

  const closeMessageHandler = () => {
    messageText.value = ''
  }

  const addSetToCartHandler = () => {
    if (selectedProducts.value.length >= 1) {
      messageText.value = ''
      mainStore.addSetToCart(mainStore.lastSearchQuery, selectedProducts.value)
    } else {
      messageText.value = t('searchResults.setMinMessage')
    }
  }
</script>

<style lang="scss">
  .search-results {
    &__result-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &__checkbox {
      flex: 0 0 auto;
      margin-right: var(--space-regular);
    }

    &__product-card {
      flex: 1 0 auto
    }

    &__buttons {
      margin-top: var(--space-big);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__error-message {
      margin-bottom: var(--space-medium);
      width: 100%;
    }
  }
</style>
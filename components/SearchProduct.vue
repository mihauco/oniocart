<template>
  <Step
    :name="$t('step.search.name')"
    :description="$t('step.search.description')"
  >
    <div class="search-product">
      <OnioInput
        class="search-product__input"
        v-model="searchQuery"
        :placeholder="$t('searchProduct.inputPlaceholder')"
      />
      <Message
        v-if="messageText"
        class="search-product__message"
        @close="messageCloseHandler"
      >
        {{ messageText }}
      </Message>
      <div class="search-product__button-wrapper">
        <OnioButton
          class="search-product__buttton"
          @click="searchForProduct"
        >
          {{ $t('button.searchProduct') }}
        </OnioButton>
      </div>
    </div>
  </Step>
</template>

<script setup lang="ts">
  import { useMainStore } from '~/store/main'
  import { useI18n } from 'vue-i18n';
  import Step from '~/components/Step.vue'
  import OnioButton from '~/components/OnioButton.vue'
  import OnioInput from '~/components/OnioInput.vue'
  import Message from '~/components/Message.vue'

  const mainStore = useMainStore()
  const { t } = useI18n();
  const searchQuery = ref('')
  const messageText = ref('')

  const searchForProduct = async () => {
    if (searchQuery.value) {
      messageText.value = ''
      mainStore.searchProduct(searchQuery.value)
    } else {
      messageText.value = t('searchProduct.emptyInputMessage')
    }
  }

  const messageCloseHandler = () => {
    messageText.value = ''
  }
</script>

<style lang="scss">
  .search-product {
    &__input {
      width: 100%;
    }

    &__message {
      margin-top: var(--space-small);
    }

    &__button-wrapper {
      margin-top: var(--space-big);
    }
  }
</style>
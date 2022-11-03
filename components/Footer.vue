<template>
  <footer class="footer">
    <Message
      v-if="messageText"
      class="footer__message"
      @close="messageCloseHandler"
    >
      {{ messageText }}
    </Message>
    <div class="footer__section footer__section--lang-select">
      <LangSelect />
    </div>
    <div class="footer__section footer__section--compare">
      <OnioButton
        class="footer__compare-button"
        alt
        @click="findBestOffers"
      >
        {{ $t('button.compare') }}
      </OnioButton>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { useMainStore } from '~/store/main';
  import { useI18n } from 'vue-i18n';
  import OnioButton from '~/components/OnioButton.vue';
  import Message from '~/components/Message.vue';
  import LangSelect from '~/components/LangSelect.vue';

  const mainStore = useMainStore()
  const { t } = useI18n();
  const messageText = ref('')

  const findBestOffers = () => {
    if (mainStore.cartSets.length > 1) {
      messageText.value = ''
      mainStore.findBestOffers()
    } else {
      messageText.value = t('footer.minProductInfo')
    }
  }

  const messageCloseHandler = () => {
    messageText.value = ''
  }
</script>

<style lang="scss">
  .footer {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    right: 0;
    z-index: 10;
    width: var(--cart-fixed-width);
    padding: var(--space-small) var(--space-medium);

    &__section {
      width: calc(50% - var(--space-small))
    }

    &__compare-button {
      width: 100%;
    }

    &__message {
      position: absolute;
      bottom: 100%;
      margin-bottom: var(--space-small);
      left: var(--space-medium);
      width: calc(100% - (2 * var(--space-medium)));
    }
  }
</style>
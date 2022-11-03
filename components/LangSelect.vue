<template>
  <div class="lang-select">
    <span class="lang-select__name">{{ $t('langSelect.name') }}</span>
    <ul class="lang-select__list">
      <li
        v-for="lang in langs"
        :key="lang.code"
        class="lang-select__lang"
        @click="selectLang(lang.code)"
      >
        <img
          :src="lang.image"
          class="lang-select__image"
          :class="{
            'lang-select__image--selected': lang.code === currentLocale
          }"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore
  import plFlag from '~/assets/images/pl.svg'
  // @ts-ignore
  import gbFlag from '~/assets/images/gb.svg'
  import { useI18n } from 'vue-i18n';

  const langs = [
    {
      code: 'pl',
      image: plFlag
    },
    {
      code: 'en',
      image: gbFlag
    }
  ]

  const { locale } = useI18n()

  const currentLocale = computed(() => locale.value)
  
  const selectLang = (langCode: string) => {
    locale.value = langCode
  }
</script>

<style lang="scss">
  .lang-select {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__name {
      color: var(--text-color-alt);
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &__lang {
      margin: 0 var(--space-tiny);
      cursor: pointer;
    }

    &__image {
      width: var(--lang-flag-size);
      display: block;
      border-radius: 50%;

      &--selected {
        border: var(--border-size-thick) solid var(--border-color-alt);
      }
    }
  }
</style>
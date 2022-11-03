<template>
  <input
    class="input"
    type="text"
    :placeholder="props.placeholder"
    v-model="value"
  >
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      placeholder: string,
      modelValue: string
    }>(),
    {
      placeholder: '',
      modelValue: ''
    }
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

  const value = ((initVal: string) => ref(initVal))(props.modelValue)

  watch(
    value,
    () => emit('update:modelValue', value.value)
  )

  watch(
    () => props.modelValue,
    () => value.value = props.modelValue
  )
</script>

<style lang="scss">
  .input {
    height: 44px;
    font-family: var(--font-family);
    font-size: var(--font-size-regular);
    color: var(--text-color-main);
    background-color: var(--input-background);
    padding: 0 var(--space-medium);
    border: var(--border-size-main) solid var(--input-border-color);
    border-radius: var(--border-radius-regular);
    transition: box-shadow .2s;

    &:focus {
      outline: none;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, .1)
    }
  }
</style>

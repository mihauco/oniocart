<template>
  <div
    class="checkbox"
    :class="{
      'checkbox--selected': selected
    }"
    :value="props.value"
    :selected="selected"
    @click="clickHandler"
  >
    <span
      v-if="selected"
      class="checkbox__chek material-symbols-outlined"
    >
      check
    </span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    value: string
    modelValue: string | string[] | null
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | string[]): void
  }>()

  const noModelSelected = ref(false)

  const selected = computed(() => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(props.value)
    } else if (typeof props.modelValue === 'string' || props.modelValue === null) {
      return props.modelValue === props.value
    }

    return noModelSelected.value
  })

  const clickHandler = () => {
    if (Array.isArray(props.modelValue)) {
      emit(
        'update:modelValue',
        props.modelValue.includes(props.value)
          ? props.modelValue.filter(value => value !== props.value)
          : [...props.modelValue, props.value]
      )
    } else if (typeof props.modelValue === 'string' || props.modelValue === null) {
      emit('update:modelValue', props.modelValue === props.value ? null : props.value)
    } else {
      noModelSelected.value = !noModelSelected.value
    }
  }
</script>

<style lang="scss">
  .checkbox {
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: var(--border-size-thick) solid var(--input-border-color);
    border-radius: var(--border-radius-regular);
    background: var(--input-background);
    cursor: pointer;

    &__chek {
      font-size: calc(var(--checkbox-size) - (2 * var(--border-size-thick)));
    }
  }
</style>

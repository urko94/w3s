<template>
  <div class="field relative mb-3">
    <textarea
      v-bind="$attrs"
      :id="id || uuid"
      :value="modelValue"
      class="body-sm scroll-native w-full resize-none bg-white/20 px-6 py-4"
      :class="[inputClass, { empty: isFieldEmpty }]"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <label
      v-show="!labelHide"
      :for="id || uuid"
      class="body-sm absolute top-4 left-6 block text-left leading-none transition-all"
      :class="labelClass"
    >
      {{ label }}
    </label>
    <transition name="slide-fade">
      <FormFieldError :error="error" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import uniqueID from '~~/utils/uuid';

const props = defineProps({
  id: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  error: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  label: { type: [String, Number], default: '' },
  inputClass: { type: [String, Array, Object], default: null },
  labelClass: { type: [String, Array, Object], default: null },
  labelHide: { type: Boolean, default: false },
});

const uuid = 'id-' + uniqueID().getID();

const isFieldEmpty = computed(() => {
  return !(props.modelValue && props.modelValue.toString().length > 0);
});
</script>

<style lang="postcss">
textarea {
  appearance: none;
  outline: none;

  &:active,
  &:focus,
  &:not(.empty) {
    + label {
      top: 4px;
      font-size: 0.75rem;
      opacity: 0.8;
    }
  }

  &::placeholder {
    @apply text-white;
  }
}
</style>

<template>
  <div class="field relative mb-3" :class="type">
    <input
      v-bind="$attrs"
      :id="id || uuid"
      :value="modelValue"
      :type="type"
      class="body-sm w-full bg-white/20 px-6 pt-5 pb-3 text-white"
      :class="[inputClass, { empty: isFieldEmpty, '!border-red !text-red': error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
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

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import uniqueID from '../../../utils/uuid';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (type: string) =>
      ['text', 'email', 'hidden', 'password', 'search', 'number', 'tel', 'url'].includes(type),
  },
  id: { type: String, default: '' },
  error: { type: String, default: '' },
  label: { type: [String, Number], required: true },
  inputClass: { type: [String, Array, Object], default: null },
  labelClass: { type: [String, Array, Object], default: null },
  labelHide: { type: Boolean, default: false },
  modelValue: { type: [String, Number], default: '' },
});

const emit = defineEmits(['update:modelValue']);
const uuid = 'id-' + uniqueID().getID();

const isFieldEmpty = computed(() => {
  return !(props.modelValue && props.modelValue.toString().length > 0);
});
</script>

<style lang="postcss" scoped>
label {
  @apply pointer-events-none;
}
.field {
  input:active,
  input:focus,
  input:not(.empty) {
    + label {
      top: 4px;
      font-size: 0.75rem;
      opacity: 0.8;
    }
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: theme('colors.white');
}
</style>

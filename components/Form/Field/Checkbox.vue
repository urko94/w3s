<template>
  <div class="field checkbox relative pb-3" :class="[$attrs.class]">
    <input
      v-bind="$attrs"
      :checked="modelValue"
      :id="uuid"
      type="checkbox"
      class="invisible absolute"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />

    <label :for="uuid" class="body-sm block py-1 pl-8 text-left" :class="[labelClass]">
      {{ label }}
    </label>

    <transition name="slide-fade">
      <FormFieldError :error="error" class="left-8 -bottom-1" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import uniqueID from '../../../utils/uuid';

const props = defineProps({
  label: { type: [String, Number], required: true },
  inputClass: { type: [String, Array, Object], default: null },
  labelClass: { type: [String, Array, Object], default: null },
  labelHide: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false },
  error: { type: String, default: '' },
});

const emit = defineEmits(['change:modelValue']);

const uuid = 'id-' + uniqueID().getID();
</script>

<style lang="postcss" scoped>
label {
  @apply relative flex w-full cursor-pointer items-center;
  line-height: 1.2;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(50% - 12px);
    display: block;
    width: 24px;
    height: 24px;
    background: #ffffff;
    opacity: 0.2;
    border-radius: 4px;
  }
}

input:checked + label:after {
  content: ' ';
  position: absolute;
  top: calc(50% - 8px);
  left: 4px;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: theme('colors.green.DEFAULT');
  @apply shadow-green;
}
</style>

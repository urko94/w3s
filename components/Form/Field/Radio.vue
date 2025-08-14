<template>
  <div :class="[$style.field, $attrs.class]">
    <span>{{ value }}</span>
    <span>{{ model }}</span>
    <input
      v-bind="$attrs"
      :disabled="disabled"
      :checked="value == model"
      :name="name"
      v-on="listeners"
      type="radio"
      class="invisible absolute"
    />

    <label
      :for="$attrs.id ? $attrs.id : null"
      class="mb-3 block rounded-[60px] bg-white/20"
      :class="[
        $style.label,
        disabled ? 'disabled cursor-not-allowed' : 'cursor-pointer',
        labelClass,
      ]"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: { type: String, default: '' },
    label: { type: [String, Number], default: '' },
    value: { type: [Boolean], default: null },
    disabled: { type: Boolean, default: false },
    inputClass: { type: [String, Array, Object], default: null },
    labelClass: { type: [String, Array, Object], default: null },
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.handleInput };
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.checked);
    },
  },
};
</script>

<style lang="postcss" module>
.field {
  @apply flex w-full items-center;

  --input-color-isDisabled: theme('colors.gray.DEFAULT');

  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
}

.label {
  @apply relative flex w-full items-center;
  padding: 7px 18px 7px 54px;

  &:before {
    content: ' ';
    position: absolute;
    left: 18px;
    top: calc(50% - 10px);
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid theme('colors.white');
    border-radius: 50%;
  }
}

input:checked + label:after {
  content: ' ';
  position: absolute;
  top: calc(50% - 6px);
  left: 22px;
  display: block;
  width: 12px;
  height: 12px;

  background-color: theme('colors.blue.DEFAULT');
  border-radius: 50%;
}
</style>

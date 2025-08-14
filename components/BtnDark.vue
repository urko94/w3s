<script lang="ts" setup>
const props = defineProps({
  href: { type: String, default: null },
  to: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  tight: { type: Boolean, default: false }, // remove horizontal padding
  relaxed: { type: Boolean, default: false }, //  For < sm: less horizontal padding, add max-width + w-full
  size: { type: String, default: 'md' },
  borderRadius: { type: String, default: '4px' },
});

const $style = useCssModule();

const btnClass = computed(() => {
  return [$style.secondary];
});

const btnHeight = computed(() => {
  return props.size === 'sm' ? '38px' : props.size === 'lg' ? '66px' : '48px';
});
</script>

<template>
  <Btn
    :href="href"
    :to="to"
    :disabled="disabled"
    :loading="loading"
    :tight="tight"
    :relaxed="relaxed"
    class="secondary"
    :class="btnClass"
    :minHeight="btnHeight"
    minWidth="unset"
    width="auto"
    :tracking="false"
    :style="{ borderRadius }"
  >
    <slot />
  </Btn>
</template>

<style lang="postcss" module>
a.secondary,
button.secondary {
  color: theme('colors.white');
  background: rgba(255, 255, 255, 0.16);
  transition: none;
  letter-spacing: 0;
  text-transform: none;
  font-weight: normal;

  &:hover {
    letter-spacing: 0;
  }
}
</style>

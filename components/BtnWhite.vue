<script lang="ts" setup>
const props = defineProps({
  href: { type: String, default: null },
  to: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  tight: { type: Boolean, default: false }, // remove horizontal padding
  relaxed: { type: Boolean, default: false }, //  For < sm: less horizontal padding, add max-width + w-full
  size: { type: String, default: 'md' },
  minWidth: { type: String, default: 'unset' },
  borderRadius: { type: String, default: '60px' },
});

const $style = useCssModule();

const btnClass = computed(() => {
  return [$style.white];
});

const btnHeight = computed(() => {
  return props.size === 'sm' ? '38px' : props.size === 'lg' ? '66px' : '56px';
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
    class="white"
    :class="btnClass"
    :minHeight="btnHeight"
    :minWidth="props.minWidth"
    width="auto"
    :tracking="false"
    :style="{ borderRadius }"
  >
    <slot />
  </Btn>
</template>

<style lang="postcss" module>
a.white,
button.white {
  color: theme('colors.black');
  background: theme('colors.white');
  transition: none;
  letter-spacing: 0;
  text-transform: none;
  font-weight: normal;

  &:hover {
    letter-spacing: 0;
  }
}
</style>

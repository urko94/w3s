<script lang="ts" setup>
const props = defineProps({
  href: { type: String, default: null },
  to: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  tight: { type: Boolean, default: false }, // remove horizontal padding
  relaxed: { type: Boolean, default: false }, //  For < sm: less horizontal padding, add max-width + w-full
  tracking: { type: Boolean, default: true },
  minHeight: { type: String, default: '66px' },
  minWidth: { type: String, default: '304px' },
  width: { type: String, default: '350px' },
  background: { type: String, default: '' },
});

const emit = defineEmits(['click']);

const $style = useCssModule();

const btnClass = computed(() => {
  return [
    $style.btn,
    props.tracking ? 'tracking-[12px]' : 'tracking-[4px]',
    {
      'md:px-12 px-4': !props.tight && !props.relaxed,
      'md:px-12 sm:max-w-none sm:w-auto px-4 max-w-full w-[295px]': props.relaxed,
      'pointer-events-none pointer-default': props.disabled || props.loading,
      'opacity-40': props.disabled,
      [$style.depressed]: props.loading,
    },
  ];
});

const spanClass = computed(() => {
  return [$style.btnText, props.tracking ? 'indent-1 md:indent-3' : 'indent-1'];
});

function onClick(ev: MouseEvent) {
  if (props.loading || props.disabled) {
    ev.preventDefault();
    ev.stopPropagation();
  } else {
    emit('click', ev);
  }
}
</script>

<template>
  <!-- Basic links -->
  <a
    v-if="href"
    v-bind="$attrs"
    :href="href"
    target="_blank"
    rel="noopener"
    :class="btnClass"
    :style="{ minHeight, minWidth, width }"
    @click="onClick"
  >
    <Spinner v-if="loading" />
    <span v-else :class="spanClass">
      <slot />
    </span>
  </a>

  <!-- Nuxt / vue router links -->
  <RouterLink
    v-else-if="to"
    v-bind="$attrs"
    :event="disabled || loading ? '' : 'click'"
    :to="to"
    :class="btnClass"
    :style="{ minHeight, minWidth, width }"
    @click="onClick"
  >
    <Spinner v-if="loading" />
    <span v-else :class="spanClass">
      <slot />
    </span>
  </RouterLink>

  <!-- Basic button -->
  <button
    v-else
    v-bind="$attrs"
    :class="btnClass"
    :style="{ minHeight, minWidth, width }"
    @click="onClick"
  >
    <Spinner v-if="loading" />
    <span v-else :class="spanClass">
      <slot />
    </span>
  </button>
</template>

<style lang="postcss" module>
.btn {
  @apply inline-flex items-center justify-center;
  color: theme('colors.dark');
  background: theme('colors.green.DEFAULT');
  font-size: 0.938rem;
  line-height: 1.75;
  transition: letter-spacing 0.2s ease-in-out;
  text-transform: uppercase;
  font-weight: 600;

  @screen md {
    white-space: nowrap;
    &:hover {
      letter-spacing: 4px;

      span.btnText {
        text-indent: 4px;
      }
    }
  }

  @screen mobile {
    max-width: 100%;
    letter-spacing: 4px;
  }
}

.btnText {
  display: flex;
  transition: text-indent 0.2s ease-in-out;
}

.depressed {
  opacity: 0.8;
}
</style>

<style lang="postcss" scoped>
a.green,
button.green {
  background: theme('colors.green.DEFAULT');
}
a.orange,
button.orange {
  background: theme('colors.orange');
}
a.blue,
button.blue {
  background: theme('colors.blue.DEFAULT');
}
a.purple,
button.purple {
  background: theme('colors.purple.DEFAULT');
}
a.gray-lighter,
button.gray-lighter {
  background: theme('colors.gray.lighter');
}
a.transparent,
button.transparent {
  background: transparent;
  color: theme('colors.white');
}
</style>

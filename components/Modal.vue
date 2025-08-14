<template>
  <div v-if="modalVisible" class="fixed top-0 bottom-0 left-0 right-0 z-20">
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-background/50"></div>
    <div class="h-full w-full" data-aos="zoom-in">
      <div
        class="fixed top-0 bottom-0 left-0 right-0 cursor-pointer"
        @click="modalVisible = false"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 max-h-[85vh] min-w-[64%] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl border-[1px] bg-background px-6 pt-12 md:px-12 xl:min-w-[1068px]"
        :class="modalClass"
        :style="{ width: width, height: height }"
        v-bind="$attrs"
      >
        <button class="absolute top-6 right-6 p-2" @click="modalVisible = false">
          <SvgInclude :name="SvgNames.Close" />
        </button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import { SvgNames } from './SvgInclude.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: 'max-content',
  },
  height: {
    type: String,
    default: 'unset',
  },
  color: {
    type: String,
    default: 'green',
    validator: (value: string) => ['orange', 'green', 'purple', 'blue'].includes(value),
  },
});

const modalVisible = ref(props.show);

const modalClass = computed(() => {
  return [
    {
      'border-orange shadow-orange': props.color == 'orange',
      'border-green shadow-green': props.color == 'green',
      'border-purple shadow-purple': props.color == 'purple',
      'border-blue shadow-blue': props.color == 'blue',
    },
  ];
});

watch(
  () => props.show,
  show => {
    modalVisible.value = show;
  }
);
watch(
  () => modalVisible.value,
  visible => {
    if (visible) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'visible';
    }
  }
);
</script>

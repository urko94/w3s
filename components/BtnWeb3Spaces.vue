<template>
  <div class="relative inline-block">
    <BtnWhite v-bind="$attrs" :size="size" class="px-4" :min-width="minWidth" tight to="/portal/">
      <strong>
        Explore Web3 Spaces
        <span class="ml-2 inline-block align-middle">
          <SvgInclude :name="SvgNames.ArrowTriangle" />
        </span>
      </strong>
    </BtnWhite>
  </div>
</template>

<script lang="ts" setup>
import { SvgNames } from './SvgInclude.vue';

const props = defineProps({
  size: { type: String, default: 'sm' },
  minWidth: { type: String, default: '215px' },
});
</script>

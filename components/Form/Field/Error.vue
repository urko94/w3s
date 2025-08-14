<template>
  <div v-if="error" class="text-xxs absolute left-6 bottom-0 text-xs text-red">
    {{ error }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: { type: String, default: '' },
});
</script>

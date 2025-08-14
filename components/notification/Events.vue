<template>
  <div v-if="availableEvents.length" class="relative mx-auto flex w-fit flex-col mobile:max-w-full">
    <NotificationEvent v-bind="availableEvents[0]"></NotificationEvent>
    <div v-if="availableEvents.length > 1" class="absolute top-full left-0 right-0 flex flex-col">
      <div v-if="shownMore" v-for="(event, i) in availableEvents.slice(1)" :key="i" class="mt-2">
        <NotificationEvent v-bind="event" animation="fade-up" :animationDelay="i * 100" />
      </div>
      <div
        v-if="shownMore"
        class="mt-2 text-center"
        data-aos="fade-up"
        :data-aos-delay="availableEvents.length * 100"
      >
        <button @click="shownMore = false" class="mx-auto flex items-center">
          <SvgInclude :name="SvgNames.Close" class="mr-3 self-center" />
          <span>close</span>
        </button>
      </div>
      <div v-else class="mt-2 text-center">
        <button @click="shownMore = true">+ {{ availableEvents.length - 1 }} more</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SvgNames } from '../SvgInclude.vue';

const props = defineProps({
  events: { type: Array<any>, default: [] },
});

const shownMore = ref(false);

const availableEvents = props.events.filter(event => !hasDatePassedBy(event?.date));

function hasDatePassedBy(date: [null, Date, String]) {
  if (date && date instanceof Date) {
    const endTime = date.getTime() + 2 * 60 * 60 * 1000;
    return new Date().getTime() > endTime;
  }
  return false;
}
</script>

<style lang="postcss" scoped></style>

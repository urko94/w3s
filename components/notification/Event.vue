<template>
  <div
    class="body-sm flex min-h-[36px] items-center rounded-[98px] bg-white py-1 px-4 text-black md:whitespace-nowrap"
    :data-aos="animation"
    :data-aos-delay="animationDelay"
  >
    <SvgInclude :name="SvgNames.PlanetIntrodus" class="mr-2 h-6 w-6" />
    <span v-html="title"></span>
    <button ref="btnRef" class="ml-2 text-blue-link underline" @click="addToCalendar()">
      Add to calendar
    </button>
  </div>
</template>

<script lang="ts" setup>
import { SvgNames } from '../SvgInclude.vue';
import { atcb_action, atcb_init } from 'add-to-calendar-button';

const props = defineProps({
  title: { type: String, default: null },
  name: { type: String, default: null },
  description: { type: String, default: null },
  date: { type: [String, Date], default: null },
  startTime: { type: String, default: null },
  endTime: { type: String, default: null },
  location: { type: String, default: null },
  animation: { type: String, default: 'fade' },
  animationDelay: { type: Number, default: 0 },
});

const btnRef = ref(null);

const config = {
  name: props.name,
  description: props.description,
  startDate: toDateFormat(props.date),
  endDate: toDateFormat(props.date),
  startTime: props.startTime,
  endTime: props.endTime,
  location: props.location,
  options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com'],
  timeZone: 'Europe/Ljubljana',
  trigger: 'click',
  iCalFileName: `Event-Web3Spaces-${props.name}`,
  listStyle: 'modal', // 'dropdown' | 'dropdown-static' | 'overlay' | 'modal'
  lightMode: 'dark', // 'system' | 'dark' | 'light' | 'bodyScheme'
  size: '5',
};

function toDateFormat(date: string | Date): string {
  if (date instanceof Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('fr-CA', options);
  }
  return date;
}

function addToCalendar() {
  atcb_action(config, btnRef.value);
}
</script>

<template>
  <span>
    <div
      class="card-event body-sm flex flex-col rounded-xl border-[1px] border-gray-lighter bg-background"
      :class="[btnClass, { 'h-full': equalHeight }, { 'cursor-pointer': isModalAvailable }]"
      :data-aos="animation"
      :data-aos-delay="animationDelay"
      @click="showModal()"
    >
      <div class="flex h-full flex-col justify-between rounded-xl px-6 py-8">
        <div class="mb-4">
          <slot name="top">
            <div>
              <a
                v-if="showLink"
                :href="videoLink"
                class="float-right leading-6 text-blue-link underline"
                target="_blank"
              >
                Join zoom
              </a>
              <h3
                class="date heading-lg mb-3"
                :class="[`text-${color}`, { '!text-white/50': hasDatePassedBy }]"
              >
                {{ toDateFormat(date) }}
              </h3>
            </div>
            <h4 v-if="name" class="mb-3">{{ name }}</h4>
            <h4 v-else class="mb-3 opacity-20">Topic of your choice</h4>
            <p class="body-sm" v-html="description"></p>
          </slot>
        </div>
        <div>
          <slot name="middle">
            <Btn
              v-if="isModalAvailable"
              :tracking="false"
              :class="color"
              width="100%"
              min-width="0px"
            >
              More
            </Btn>
          </slot>
        </div>
      </div>
      <div class="rounded-b-xl bg-gray-dark/[0.16]">
        <slot name="bottom"></slot>
      </div>
    </div>
    <Modal :show="modalVisible" :width="modalWidth" :color="color">
      <div class="flex max-h-[85vh] min-h-[660px] flex-col lg:flex-row">
        <!-- Modal - Left side -->
        <div class="flex flex-col justify-between lg:mb-[74px] lg:w-[54%] lg:pr-[72px]">
          <div>
            <h4 class="mb-5">
              <span v-if="!hasDatePassedBy">Live </span>
              <span :class="`text-${color}`">{{ toDateFormat(date) }}</span>
            </h4>
            <h2 class="mb-5">
              {{ name }}
            </h2>
            <p class="mb-12" v-html="description"></p>
            <div v-if="speakers" class="mb-10">
              <h5 class="mb-4 uppercase">Experts</h5>
              <div class="flex flex-wrap">
                <component
                  v-for="speaker in speakers"
                  :is="speaker instanceof Object && speaker.link ? 'a' : 'div'"
                  :href="speaker.link || undefined"
                  class="mr-4 mb-2 flex items-center whitespace-nowrap"
                  target="_blank"
                >
                  <img
                    src="/assets/images/portal/spaceman-head.svg"
                    class="mr-3"
                    alt="Web3Spaces"
                    width="24"
                    height="26"
                  />
                  <span v-if="speaker.name">{{ speaker.name }}</span>
                  <span v-else>{{ speaker }}</span>
                </component>
              </div>
            </div>
          </div>

          <div>
            <slot name="modalForm"></slot>
          </div>
        </div>
        <!-- Modal - Right side -->
        <div class="lg:mt-12 lg:mb-[74px] lg:w-[46%] lg:border-l-[1px] lg:pl-[72px]">
          <!-- Show this content if user is Logged in  -->
          <template v-if="authStore.loggedIn">
            <!-- Event has past, watch VIDEO -->
            <div v-if="hasDatePassedBy && video">
              <h5 class="mb-4 uppercase">INFO</h5>
              <p class="body-sm mb-4 opacity-80">
                Sorry, the event has already passed. You can watch the recording on YouTube.
              </p>
              <a :href="video" :class="`text-${color}`" class="body-sm underline" target="_blank">
                Watch YouTube video
              </a>
            </div>
            <div v-else-if="hasDatePassedBy && !showLink">
              <!-- Event has past, LINK -->
              <h5 class="mb-4 uppercase">INFO</h5>
              <p class="body-sm mb-4 opacity-80">Sorry, the event has already passed.</p>
            </div>
            <div v-else>
              <!-- Netx event -->
              <div v-if="startTime">
                <h5 class="mb-4 uppercase">Time slot</h5>
                <div class="mb-12 flex items-center">
                  <img
                    src="/assets/icons/clock.svg"
                    class="mr-4"
                    alt="clock"
                    width="20"
                    height="20"
                  />
                  <h4>{{ startTime }}</h4>
                  <span v-if="endTime">&nbsp;-&nbsp;</span>
                  <h4 v-if="endTime">{{ endTime }}</h4>
                </div>
              </div>
              <h5 class="mb-4 uppercase">Online event</h5>
              <p class="body-sm mb-4 opacity-80">
                Zoom link will be available from {{ toDayHourFormat(date) }}
              </p>
              <Btn
                :href="videoLink"
                :class="color"
                width="263px"
                min-width="0px"
                :disabled="!showLink"
                >Join</Btn
              >
            </div>
            <!-- Files -->
            <div v-if="files" class="mt-10">
              <h5 v-if="files.length > 1" class="mb-4 uppercase">FILES</h5>
              <h5 v-else class="mb-4 uppercase">FILE</h5>
              <div v-for="file in files" class="mb-2">
                <a
                  :href="file.link"
                  :class="`text-${color}`"
                  class="body-sm underline"
                  target="_blank"
                >
                  <span>{{ file.name }}</span>
                </a>
              </div>
            </div>
          </template>
          <template v-else>
            <div>
              <h5 class="mb-4 uppercase">INFO</h5>
              <MetamaskConnect
                login-message="You must be logged in to view event information."
              ></MetamaskConnect>
            </div>
          </template>
        </div>
      </div>
    </Modal>
  </span>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~~/store/auth';

const props = defineProps({
  name: { type: String, default: null },
  date: { type: [String, Date], default: 'Cooming soon' },
  startTime: { type: String, default: null },
  endTime: { type: String, default: null },
  description: { type: String, default: null },
  video: { type: String, default: null },
  videoLink: { type: String, default: null },
  files: { type: Array<{ name: string; link: string }>, default: null },
  speakers: { type: Array<any>, default: null },
  color: { type: String, required: true },
  animation: { type: String, default: 'fade' },
  animationDelay: { type: Number, default: 0 },
  equalHeight: { type: Boolean, default: false },
  modalWidth: { type: String, default: null },
});

const authStore = useAuthStore();

/** Open modal on page load if query parameter equals event's key */
const attrs = useAttrs();
const { query } = useRoute();
onMounted(() => {
  const currentEvent: number = query?.event ? parseInt(`${query.event}`) : -1;
  if (currentEvent == attrs['v-bind:key']) {
    showModal();
  }
});

const btnClass = computed(() => {
  return [
    {
      'hover:shadow-orange': props.color == 'orange',
      'hover:shadow-green': props.color == 'green',
      'hover:shadow-purple': props.color == 'purple',
      'hover:shadow-blue': props.color == 'blue',
    },
  ];
});

const modalVisible = ref(false);
const showModal = () => {
  if (isModalAvailable.value) {
    modalVisible.value = false;
    setTimeout(() => (modalVisible.value = true), 1);
  }
};

const isModalAvailable = computed(() => {
  return props.video || props.videoLink || (props.date instanceof Date && !hasDatePassedBy.value)
    ? true
    : false;
});

const showLink = computed(() => {
  // Show link 2 day before event
  if (props.videoLink && props.date instanceof Date) {
    const startTime = props.date.getTime() - 48 * 60 * 60 * 1000;
    const endTime = props.date.getTime() + 4 * 60 * 60 * 1000;
    return startTime < new Date().getTime() && new Date().getTime() < endTime;
  }
  return props.videoLink ? true : false;
});

const hasDatePassedBy = computed(() => {
  if (props.date instanceof Date) {
    return props.date.getTime() < new Date().getTime();
  }
  return false;
});

function toDateFormat(date: string | Date): string {
  if (date instanceof Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-us', options);
  }
  return date;
}

function toDayHourFormat(date: string | Date): string {
  if (date instanceof Date) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return date.toLocaleDateString('en-us', options);
  }
  return date;
}
</script>

<style lang="postcss" scoped>
.card-event:not(:hover) h3 {
  color: theme('colors.white');
}
</style>

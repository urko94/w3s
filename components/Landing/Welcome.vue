<template>
  <section class="relative flex min-h-screen flex-col items-center">
    <!-- BG details -->
    <div class="z-1 absolute top-0 left-1/2 h-full w-full -translate-x-1/2">
      <div class="absolute left-[10%] top-0">
        <img src="/assets/icons/blue-circle.svg" alt="icon-blue-circle" />
      </div>
      <div class="md:comet-desktop comet-mobile absolute -right-1/4 top-0 w-[120px] md:top-0">
        <img src="/assets/icons/comet.svg" class="xl:rotate-[10deg]" alt="icon-comet" />
      </div>
      <div class="absolute right-0 top-[45%] md:top-[60%]">
        <img src="/assets/icons/green-triangle.svg" alt="icon-green-triangle" />
      </div>
      <div class="absolute top-[40%] left-0 md:top-[50%]">
        <img src="/assets/icons/purple-half-ellipse.svg" alt="icon-purple-half-ellipse" />
      </div>
    </div>
    <!-- Main graphic -->
    <div
      class="absolute right-[15%] bottom-1/4 z-[-1] min-h-[95%] w-full min-w-[75%] sm:right-1/4 sm:min-h-[85%] sm:w-auto"
    >
      <SvgInclude :name="SvgNames.Waves" class="waves flow h-full w-full" />
    </div>
    <!-- Main content -->
    <div
      v-if="authStore.loggedIn"
      class="relative z-[2] w-full px-8 pt-44 pb-48 text-center md:pb-14"
    >
      <h4 class="mb-4 text-green">The first voyage has started</h4>
      <!-- <h1 class="mobile:-mx-4 mobile:whitespace-nowrap mobile:text-4xl">
        <vue-countdown :time="eventTime" v-slot="{ days, hours, minutes, seconds }">
          {{ days }} d {{ hours }} h {{ minutes }} min {{ seconds }} sec
        </vue-countdown>
      </h1> -->
      <div class="mb-7">
        <BtnWeb3Spaces />
      </div>
      <h5 class="uppercase">Your token</h5>
      <div class="relative">
        <button
          class="relative scale-100 uppercase tracking-[3px] underline duration-500 ease-in-out hover:scale-110"
          @click="showModalGame()"
        >
          <img
            v-if="isTokenVip"
            src="/assets/images/tokenVip.svg"
            class="mx-auto"
            alt="icon-vip-token"
            width="353"
            height="550"
          />
          <img
            v-else
            src="/assets/images/token.svg"
            class="mx-auto"
            alt="icon-vip-token"
            width="353"
            height="550"
          />
          <span class="body-sm absolute top-1/2 translate-y-full -translate-x-1/2">Play game</span>
        </button>
      </div>

      <!-- Modal Login success -->
      <Modal :show="modalGameVisible" width="1068px" class="px-0 pt-0 md:px-0">
        <iframe
          ref="gameRef"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameborder="0"
          height="100%"
          sandbox="allow-scripts"
          :src="gameUrl"
          width="100%"
          style="min-height: 500px"
        ></iframe>
      </Modal>
    </div>

    <div v-else class="relative z-[2] max-w-[944px] px-8 pt-44 pb-48 text-center md:pb-14 md:pt-28">
      <h1 class="mx-auto mb-1 max-w-[343px] sm:mb-2 sm:max-w-[550px] md:max-w-full">
        Grow your brand with <br />
        <span class="text-green">Web3 Spaces</span>
      </h1>
      <p class="mx-auto">
        Discover how to plan a product or campaign with Web3 technologies, kick start it
        successfully, and make waves in your community.
      </p>
      <div
        @click.prevent="scrollDown"
        :class="{ 'opacity-0': !showScroll }"
        class="relative left-[50%] mt-14 mb-24 -translate-x-1/2 cursor-pointer transition-opacity duration-500 md:hidden"
      >
        <SvgInclude :name="SvgNames.ScrollWhite" />
      </div>

      <div class="flex flex-wrap items-center text-left">
        <div class="w-full mobile:mb-10 md:w-1/2 md:pb-24">
          <h4 v-if="isUniqueLink" class="mb-3">Join Web3 Spaces Academy</h4>
          <h4 v-else class="mb-3">Enter Web3 Spaces Academy</h4>

          <p v-if="isUniqueLink" class="body-sm mb-4">
            Access online events, Q&As, tailored workshops,
            <br class="hidden md:block" />and much more.
          </p>
          <p v-else class="body-sm mb-4">
            Join online events, Q&As, tailored workshops,
            <br class="hidden md:block" />and much more.
          </p>

          <img class="ml-8 mb-2" src="/assets/icons/arrow-down.svg" alt="icon-arrow" />
          <!-- TODO: Number of tokens claimed 
          <span class="body-sm text-green">Hurry, 8 of 20 tokens are already claimed!</span>
          -->
          <div class="mt-2 inline-block">
            <Btn class="mobile:!w-full mobile:!min-w-full" @click="emit('redeemToken')">
              <span v-if="isUniqueLink">Redeem token</span>
              <span v-else>Apply now</span>
            </Btn>
            <div v-if="!isUniqueLink" class="mt-2 text-right">
              <span class="body-sm mr-3 italic text-white md:text-black">Or</span>
              <BtnWeb3Spaces
                class="!bg-transparent px-0 mobile:!text-white"
                size="md"
                min-width="180px"
              ></BtnWeb3Spaces>
            </div>
          </div>
        </div>
        <div class="relative w-full mobile:pl-[33%] md:w-1/2">
          <div class="tokens-wrapper relative mx-auto max-h-[300px] w-fit md:max-h-[55vh]">
            <img
              class="token-vip relative max-h-[inherit] w-full"
              src="/assets/images/tokenVip_rotated.svg"
              alt="icon-vip-token"
            />
            <img
              v-if="isUniqueLink"
              class="token absolute top-[2%] left-0 max-h-full w-[90%]"
              src="/assets/images/token_rotated.svg"
              alt="icon-token"
            />
            <img
              v-else
              class="token absolute top-[2%] left-0 max-h-full w-[90%]"
              src="/assets/images/token_rotated_locked.svg"
              alt="icon-token"
            />
          </div>

          <div
            class="absolute left-1/4 top-4 flex w-[110px] mobile:-translate-x-1/2 mobile:flex-col mobile:items-center md:left-[90%] md:top-[45%] md:w-[150px] md:-translate-y-1/2 xl:w-[200px]"
          >
            <img
              class="mr-4 max-w-[28px] mobile:order-1 mobile:rotate-180"
              src="/assets/icons/arrow-vip.svg"
              alt="icon-arrow"
            />
            <span class="text-gold italic">1 in 10 tokens is VIP!</span>
          </div>
        </div>
      </div>

      <div
        @click.prevent="scrollDown"
        :class="{ 'opacity-0': !showScroll }"
        class="absolute top-[96vh] left-[50%] hidden -translate-x-1/2 -translate-y-full cursor-pointer transition-opacity duration-500 md:block"
      >
        <SvgInclude :name="SvgNames.Scroll" />
      </div>
    </div>
    <!-- Moon -->
    <div
      class="absolute bottom-[20%] left-1/2 z-[-1] w-[1680px] min-w-[100%] max-w-[250vw] -translate-x-1/2 translate-y-[100%] md:bottom-[40%]"
    >
      <img class="w-full" src="/assets/icons/moon.svg" alt="icon-moon" />
    </div>
    <div ref="startScreenRef"></div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store/auth';
import { scrollToOffset } from '~~/utils/misc';
import { SvgNames } from '../SvgInclude.vue';
import VueCountdown from '@chenfengyuan/vue-countdown';

const props = defineProps({
  isUniqueLink: { type: Boolean, default: false },
});

const emit = defineEmits(['redeemToken']);

const authStore = useAuthStore();

const eventTime = new Date('2022-10-13T09:00:00').getTime() - new Date().getTime();

const isTokenVip = computed(() => {
  return authStore.tokenType === 'vip';
});

/** Show scroll down */
const { y } = useWindowScroll();
const showScroll = computed(() => {
  return y.value <= window.innerHeight / 2.5;
});

/** Scroll down */
const startScreenRef = ref(null);
function scrollDown() {
  if (startScreenRef.value) {
    const startScreenEl: HTMLElement = startScreenRef.value;
    scrollToOffset(startScreenEl.getBoundingClientRect().top || 0);
  }
}

/**
 * Modal Game
 */
const config = useRuntimeConfig();
const gameUrl = computed(() => {
  return (
    config.GAME_BASE_URL + '?' + new URLSearchParams({ id: `${authStore.tokenId}` }).toString()
  );
});
const gameRef = ref<HTMLElement | null>(null);

const modalGameVisible = ref(false);
function showModalGame() {
  modalGameVisible.value = false;
  setTimeout(() => {
    modalGameVisible.value = true;
  }, 1);
  setTimeout(() => {
    if (gameRef.value) {
      gameRef.value.focus();
    }
  }, 10);
}
</script>

<style lang="postcss">
.tokens-wrapper {
  .token-vip {
    transition: all 0.3s;
  }

  &:hover .token-vip {
    transform: rotate(5deg);
  }
}
</style>

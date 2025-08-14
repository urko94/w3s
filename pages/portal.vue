<template>
  <main>
    <Nav :events="isIndividualPlanetShown ? [] : events" />
    <div
      id="solarSystem"
      ref="solarSystemRef"
      class="relative h-[650px] max-h-[125vh] min-h-[100vh] w-full mobile:max-h-[100vh] sm:h-[750px] md:h-[850px] lg:h-[950px] xl:h-[1050px]"
    >
      <!-- BG details -->
      <div
        class="absolute top-0 left-1/2 h-full max-h-[200vh] w-full -translate-x-1/2 overflow-hidden"
      >
        <div class="comet-1 absolute -left-1/4 top-20 md:top-10">
          <img
            class="rotate-[-133deg] mobile:w-[60px]"
            src="/assets/icons/comet.svg"
            alt="icon-comet"
            width="90px"
            height="90px"
          />
        </div>
        <div class="comet-2 absolute -right-1/4 top-0 md:-top-1/3">
          <img
            src="/assets/icons/comet.svg"
            class="mobile:w-[90px]"
            alt="icon-comet"
            width="120px"
            height="120px"
          />
        </div>
        <div class="comet-3 absolute -left-1/4 top-0 md:-top-1/3">
          <img
            class="rotate-[-105deg]"
            src="/assets/icons/comet.svg"
            alt="icon-comet"
            width="60px"
            height="60px"
          />
        </div>
      </div>
      <div
        class="absolute top-1/2 left-1/2 z-[2] w-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 md:min-w-[1680px]"
        :style="{
          '--tw-scale-x': solarSystemScale,
          '--tw-scale-y': solarSystemScale,
          '--tw-translate-x': solarSystemTranslateX,
          '--tw-translate-y': solarSystemTranslateY,
        }"
      >
        <SvgInclude
          :name="SvgNames.SolarSystem"
          class="flow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible mobile:max-h-[45vw] mobile:w-[150vw]"
        />
        <img
          class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mobile:max-w-[10vw] md:-translate-x-3/4"
          src="/assets/images/portal/sun.svg"
          alt="sun"
        />
        <div v-for="(planet, i) in planets">
          <PortalPlanet
            v-show="isPlanetVisible(i + 1)"
            v-bind="planet"
            :planet-number="i + 1"
            :is-planet-presented="pageSwipes === i + 1"
          />
        </div>
      </div>
    </div>
    <PortalFooter class="hidden md:block" />
    <div
      :class="{ 'opacity-25': isIndividualPlanetShown }"
      class="absolute top-[99vh] left-[50%] -z-10 -translate-x-1/2 -translate-y-full cursor-pointer transition-opacity duration-500 md:hidden"
    >
      <p
        class="body-sm mb-1 whitespace-nowrap pb-2 text-center font-bold tracking-[4px] text-shadow-green"
      >
        swipe down to explore
      </p>
      <SvgInclude :name="SvgNames.ScrollWhite" class="h-10" />
    </div>
    <div class="foreground"></div>
    <Modal :show="showModal">
      <h2 class="mt-10 mb-6 text-center">Welcome to <span class="text-green">Web3 Spaces</span></h2>
      <p class="mx-auto mb-4 max-w-[800px] text-center">
        Discover the content of upcoming events, and how they will help your brand on its Web3
        journey. Join high-level topic intros, AMAs, private meetings with experts, and tailored
        workshops.
      </p>
      <p class="mx-auto max-w-[630px] text-center">
        Hover over the planets to check their atmosphere, and click the Explore button to get closer
        to the planet’s landscape.
      </p>
      <p class="mx-auto mb-8 max-w-[630px] text-center text-4xl">
        <strong>3, 2, 1...</strong>
      </p>
      <div class="text-center">
        <Btn class="mb-14" width="420px" @click="showModal = false">BLAST OFF TO WEB3</Btn>
      </div>
      <img
        class="mx-auto"
        src="/assets/images/portal/spaceman.svg"
        alt="spaceman"
        width="140"
        height="143"
      />
    </Modal>
  </main>
</template>

<script setup lang="ts">
// @ts-ignore
import AOS from 'aos';
import { SvgNames } from '~~/components/SvgInclude.vue';
import events from '~~/store/events';

useHead({
  title: 'Portal',
});

definePageMeta({
  layout: 'portal',
});

onMounted(() => {
  AOS.init();
});

/**
 * Show welcome modal in first page view
 */
const showModal = ref(false);
if (!localStorage.getItem('modalWelcome')) {
  setTimeout(() => (showModal.value = true), 500);
  localStorage.setItem('modalWelcome', '1');
}

/**
 * Scale down solar system on mobile
 */
const { width, height } = useWindowSize();
const solarSystemScale = computed(() => {
  if (width.value < 768 && pageSwipes.value > 0) {
    return 2.5;
  } else if ((width.value > 1680 && height.value > 758) || width.value < 768) {
    return 1;
  }
  return Math.min(Math.sqrt(width.value / 1680), Math.sqrt(height.value / 758));
});

/** Show swipe down on mobile */
const solarSystemRef = ref(null);
const pageSwipes = ref(0);

const isIndividualPlanetShown = computed(() => {
  return pageSwipes.value > 0;
});

const solarSystemTranslateX = computed(() => {
  if (width.value >= 768 || pageSwipes.value === 0) {
    return '-50%';
  } else if (pageSwipes.value === 1) {
    return '12%';
  } else if (pageSwipes.value === 2) {
    return '2%';
  } else if (pageSwipes.value === 3) {
    return '-175%';
  } else if (pageSwipes.value === 4) {
    return '-175%';
  }
  return '-50%';
});
const solarSystemTranslateY = computed(() => {
  if (width.value >= 768 || pageSwipes.value === 0) {
    return '-50%';
  } else if (pageSwipes.value === 1) {
    return '-300px';
  } else if (pageSwipes.value === 2) {
    return '-100px';
  } else if (pageSwipes.value === 3) {
    return '-320px';
  } else if (pageSwipes.value === 4) {
    return '-100px';
  }
  return '-50%';
});

// Swipe between planets, pageSwipes is index of currently selected planet
const { lengthX, lengthY } = useSwipe(solarSystemRef, {
  onSwipeEnd() {
    if (Math.abs(lengthY.value) > 50 && Math.abs(lengthY.value) > Math.abs(lengthX.value)) {
      if (lengthY.value > 0 && pageSwipes.value < 4) {
        pageSwipes.value += 1;
      } else if (lengthY.value > 0 && pageSwipes.value === 4) {
        pageSwipes.value = 0;
      } else if (lengthY.value < 0 && pageSwipes.value > 0) {
        pageSwipes.value -= 1;
      }
    }
  },
});

function isPlanetVisible(index: number) {
  if (width.value < 768 && index != pageSwipes.value && pageSwipes.value > 0) {
    return false;
  }
  return true;
}

/**
 * Planets data
 */
const planets = [
  {
    name: 'Introdus',
    cssClass: 'introdus',
    imageName: SvgNames.PlanetIntrodus,
    color: 'orange',
    shortDescription: 'On the first stop of your Web3 voyage, you will explore key topics.',
    events: [
      { name: 'NFT trends', date: '13.OCT' },
      { name: 'Technologies', date: '20.OCT' },
      { name: 'Legal', date: '10.NOV' },
      { name: 'QA sessions', date: '17.NOV' },
    ],
    description:
      'Start your journey with live sessions by field experts, and prepare questions to learn how <strong>Web3 could serve your brand</strong>.',
    link: '/planet/introdus/',
  },
  {
    name: 'AMAlin',
    cssClass: 'amalin',
    imageName: SvgNames.PlanetAmalin,
    color: 'blue',
    shortDescription:
      'On the second stop, you’ll get a chance to apply gained knowledge to <strong>your brand’s vision</strong>.',
    events: [],
    description:
      'Choose topics that would <strong>benefit your business the most</strong> and discuss the ins and outs with our experts in <strong>Ask Me Anything</strong> sessions.',
    link: '/planet/amalin/',
  },
  {
    name: 'TriOs',
    cssClass: 'trios',
    imageName: SvgNames.PlanetTrios,
    color: 'purple',
    shortDescription:
      'On the third planet, your chosen Kalmia expert will take you on a private, <span class="whitespace-nowrap">One-On-One</span> consulting session covering what you’re interested in most:',
    events: [
      { name: 'Blockchain technology in general' },
      { name: 'Legal aspects of Web3 in business' },
      { name: 'Concept development for Web3 projects' },
      { name: 'Web3 solutions for brands' },
    ],
    description: 'Apply expert advice to your project and start plotting your Web3 story.',
    link: '/planet/trios/',
  },
  {
    name: 'Opushop',
    cssClass: 'opushop',
    imageName: SvgNames.PlanetOpushop,
    color: 'green',
    shortDescription:
      'On the fourth planet, the real work begins. Kick-start your Web3 project in hands-on workshops at a special price - or, if you’re a lucky owner of a VIP NFT, free of charge!',
    events: [],
    description: `Start building your Web3 project with a carefully curated blueprint by Kalmia experts and external partners, tailored to cover your brand’s needs.`,
    link: '/planet/opushop/',
  },
];
</script>

<style lang="postcss" scoped></style>

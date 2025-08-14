<template>
  <section class="relative z-[2] mt-52 flex flex-col px-8 md:mt-0 md:items-center">
    <!-- BG details -->
    <div class="z-1 absolute left-1/2 h-full w-full -translate-x-1/2">
      <div class="comet-desktop absolute top-[60%] z-[-3] hidden w-[80px] md:block">
        <img src="/assets/icons/comet.svg" alt="icon-comet" />
      </div>
      <div class="comet-mobile-toRight md-hidden absolute top-[60%] left-[-30%] z-[-3] w-[80px]">
        <img class="rotate-[-120deg]" src="/assets/icons/comet.svg" alt="icon-comet" />
      </div>
      <div class="diagonal-first-3 absolute right-[-30%] top-[60%] hidden w-[80px] md:block">
        <img src="/assets/icons/comet.svg" alt="icon-comet" />
      </div>
    </div>
    <!-- Main content -->
    <div class="relative w-full max-w-[1300px] pb-64 md:pb-16">
      <!-- Journey Path -->
      <div class="absolute right-0 top-0 mt-72 w-full md:mt-0 md:pl-[27%]">
        <SvgInclude
          :name="SvgNames.JourneyPath"
          class="flow relative left-1/2 hidden -translate-x-1/2 md:block"
        />
        <SvgInclude
          :name="SvgNames.JourneyPathMobile"
          class="flow relative left-1/3 -translate-x-1/3 md:hidden"
        />
      </div>
      <!-- Planet Introdus -->
      <div
        class="flex h-[600px] flex-col justify-end md:h-[500px] md:flex-row md:pb-16 md:pr-[27%]"
        data-aos="fade-in"
      >
        <div class="flex items-center">
          <div class="flex max-w-[400px] flex-col md:items-start">
            <h3 class="whitespace-nowrap mobile:mb-8">
              #1 Planet <span class="text-orange">Introdus</span>
            </h3>
            <p class="mb-2">
              Start the engine by understanding the context of the Web3 space, its complexity, and
              the main aspects you should consider.
            </p>
            <NuxtLink to="/planet/introdus/" class="mb-4 font-bold text-orange">
              Explore
              <span class="ml-2 inline-block align-middle">
                <SvgInclude :name="SvgNames.ArrowTriangle" />
              </span>
            </NuxtLink>
          </div>
        </div>
        <div class="body-lg md:body-md flex items-center justify-center md:pl-12">
          <div class="relative flex flex-col mobile:w-full">
            <img
              class="relative order-1 self-baseline mobile:left-[55%] mobile:-translate-x-1/2"
              src="/assets/images/planet/INTRODUS.svg"
              alt="planet-Introdus"
            />
            <div class="top-0 right-[-10px] flex items-center md:absolute md:translate-x-full">
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span>Legal Guidelines</span>
            </div>
            <div class="top-[50%] right-[-20px] flex items-center md:absolute md:translate-x-full">
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span>Web3 Technologies</span>
            </div>
            <div class="top-[90%] right-[-5px] flex items-center md:absolute md:translate-x-full">
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span>NFT Trends</span>
            </div>
            <div
              class="top-[100%] left-1/3 flex items-center md:absolute md:flex-col md:items-start"
            >
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span class="md:ml-2">Q&A Sessions</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Planet AMAlin -->
      <div
        class="flex h-[48rem] w-full flex-col mobile:justify-end md:h-[580px] md:flex-row md:pl-[19%]"
        data-aos="fade-in"
      >
        <div class="flex items-center justify-end pl-12 mobile:text-right md:order-1">
          <div class="flex max-w-[400px] flex-col md:items-start">
            <h3 class="whitespace-nowrap mobile:mb-8">
              #2 Planet <span class="text-blue">AMAlin</span>
            </h3>
            <p class="mb-2">
              Apply gained knowledge to your brand case, raise questions, and clear doubts in live
              AMA sessions dedicated to voted topics.
            </p>
            <NuxtLink to="/planet/amalin/" class="mb-4 font-bold text-blue">
              Explore
              <span class="ml-2 inline-block align-middle">
                <SvgInclude :name="SvgNames.ArrowTriangle" />
              </span>
            </NuxtLink>
          </div>
        </div>
        <div class="body-lg md:body-md flex items-center justify-center">
          <div class="relative flex flex-col items-end mobile:w-full">
            <img
              class="relative order-1 self-start mobile:left-[25%] mobile:-translate-x-1/2"
              src="/assets/images/planet/AMAlin.svg"
              alt="planet-AMAlin"
            />
            <div
              class="top-[-2%] left-[20%] flex items-center text-right md:absolute md:-translate-x-full md:-translate-y-1/2"
            >
              <img class="md:order-1" src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span><strong>Ask Me Anything</strong> sessions</span>
            </div>
            <div
              class="top-[50%] left-[-8%] flex max-w-[100%] items-center md:absolute md:max-w-[150px] md:-translate-x-full md:-translate-y-1/2 lg:max-w-[100%]"
            >
              <span class="mobile:order-1">Various topic choices</span>
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
            </div>
            <div class="top-[90%] left-[15%] flex items-center md:absolute md:-translate-x-full">
              <span class="mobile:order-1">Voting rights</span>
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
            </div>
          </div>
        </div>
      </div>
      <!-- Planet TriOs -->
      <div
        class="flex h-[48rem] flex-col justify-end md:h-[580px] md:flex-row md:pr-[24%]"
        data-aos="fade-in"
      >
        <div class="flex items-center">
          <div class="flex max-w-[400px] flex-col md:items-start">
            <h3 class="whitespace-nowrap mobile:mb-8">
              #3 Planet <span class="text-purple">TriOs</span>
            </h3>

            <p class="mb-2">
              Make a solo landing and discuss the specifics of your brand’s Web vision in private
              consulting with Kalmia’s Web3 experts.
            </p>
            <NuxtLink to="/planet/trios/" class="mb-4 font-bold text-purple">
              Explore
              <span class="ml-2 inline-block align-middle">
                <SvgInclude :name="SvgNames.ArrowTriangle" />
              </span>
            </NuxtLink>
          </div>
        </div>
        <div class="body-lg md:body-md flex items-center justify-center md:pl-12">
          <div class="relative flex flex-col items-start mobile:w-full">
            <img
              class="relative order-1 self-baseline mobile:left-[65%] mobile:-translate-x-1/2"
              src="/assets/images/planet/TriOs.svg"
              alt="planet-TriOs"
            />
            <div
              class="top-[30%] right-[-20px] flex items-start md:absolute md:translate-x-full md:items-center"
            >
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span class=""> <strong>One on One</strong> expert consulting </span>
            </div>
            <div class="top-[70%] right-[-10px] flex items-center md:absolute md:translate-x-full">
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span class="">Tailored to topic of your choice</span>
            </div>
            <div class="top-[105%] right-[15px] flex items-center md:absolute md:translate-x-full">
              <img src="/assets/icons/white-dot.svg" alt="icon-dot" />
              <span>Aspects of Web3 building</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Planet Opushop -->
      <div
        class="flex h-[46rem] w-full flex-col mobile:justify-end md:h-[580px] md:flex-row md:pl-[32%]"
        data-aos="fade-in"
      >
        <div class="flex items-center justify-end pl-12 mobile:text-right md:order-1">
          <div class="flex max-w-[400px] flex-col md:items-start">
            <h3 class="whitespace-nowrap mobile:mb-8">
              #4 Planet <span class="text-green">Opushop</span>
            </h3>
            <p class="mb-2">
              Kick-start your Web3 project in hands-on workshops and with a carefully curated
              blueprint covering your brand’s needs.
            </p>
            <NuxtLink to="/planet/opushop/" class="mb-4 font-bold text-green">
              Explore
              <span class="ml-2 inline-block align-middle">
                <SvgInclude :name="SvgNames.ArrowTriangle" />
              </span>
            </NuxtLink>
          </div>
        </div>
        <div class="body-lg md:body-md flex items-center justify-center">
          <div class="relative flex flex-col items-end mobile:w-full">
            <img
              class="relative order-1 self-start mobile:left-[30%] mobile:-translate-x-1/2"
              src="/assets/images/planet/Opushop.svg"
              alt="planet-Opushop"
            />

            <div
              class="top-[-2%] left-[20%] inline-block items-center text-right md:absolute md:flex md:-translate-x-full md:-translate-y-1/2"
            >
              <img
                class="-mt-1 -mb-2 mobile:float-left md:order-1"
                src="/assets/icons/white-dot.svg"
                alt="icon-dot"
              />
              <span class="text-right">Practical Workshops</span>
            </div>
            <div
              class="top-[50%] left-[-8%] flex items-center md:absolute md:-translate-x-full md:-translate-y-1/2"
            >
              <img src="/assets/icons/white-dot.svg" class="md:order-1" alt="icon-dot" />
              <span class="text-right"> Tangible results </span>
            </div>
            <div class="top-[90%] left-[15%] flex items-center md:absolute md:-translate-x-full">
              <img src="/assets/icons/white-dot.svg" class="md:order-1" alt="icon-dot" />
              <span>Custom Web3 project plan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import AOS from 'aos';
import { SvgNames } from '~~/components/SvgInclude.vue';
import { useAuthStore } from '~~/store/auth';

const authStore = useAuthStore();
</script>

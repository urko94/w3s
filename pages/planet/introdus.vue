<template>
  <main class="min-h-[100vh]">
    <Nav exit="/portal" :planet="SvgNames.PlanetIntrodus" />
    <div class="container max-w-[1380px] pt-40 pb-20">
      <div class="relative mt-5 bg-background">
        <h1 class="mx-auto mb-6 px-4 text-center md:px-8">
          #1 Planet
          <span :class="`text-${color}`">Introdus</span>
        </h1>
        <p class="mx-auto mb-10 text-center md:max-w-[680px] lg:max-w-[887px]">
          Gain a basic overview of the critical aspects you should understand before building your
          Web3 project.
        </p>
        <div class="absolute -top-2 -left-2 mobile:w-5 md:left-0 md:top-1/2">
          <RouterLink to="/planet/opushop/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full" />
          </RouterLink>
        </div>
        <div class="absolute -top-2 -right-2 mobile:w-5 md:right-0 md:top-1/2">
          <RouterLink to="/planet/amalin/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full rotate-180" />
          </RouterLink>
        </div>
      </div>
      <div class="relative z-[1] mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardEvent
          v-for="(event, key) in events"
          :equal-height="true"
          v-bind="event"
          :v-bind:key="key"
          :color="color"
          modal-width="1420px"
        ></CardEvent>
      </div>
    </div>
    <PortalFooter />
    <div class="foreground" />
  </main>
</template>

<script setup lang="ts">
// @ts-ignore
import AOS from 'aos';
import { SvgNames } from '~~/components/SvgInclude.vue';
import events from '~~/store/events';

useHead({
  title: 'Planet Introdus',
});

definePageMeta({
  layout: 'portal',
});

onMounted(() => {
  AOS.init();
});

const color = 'orange';
</script>

<style lang="postcss" scoped></style>

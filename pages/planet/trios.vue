<template>
  <main class="min-h-[100vh]">
    <Nav exit="/portal" :planet="SvgNames.PlanetTrios" />
    <div class="container max-w-[1380px] pt-40 pb-20">
      <div class="relative mt-5 bg-background">
        <h1 class="mx-auto mb-6 px-4 text-center md:px-8">
          #3 Planet
          <span :class="`text-${color}`">TriOs</span>
        </h1>
        <p class="mx-auto mb-10 text-center md:max-w-[680px] lg:max-w-[887px]">
          Book <strong>One-On-One</strong> call with Kalmia experts and get
          <strong>tailored guidance</strong> through the specifics of your project.
        </p>
        <div class="absolute -top-2 -left-2 mobile:w-5 md:left-0 md:top-1/2">
          <RouterLink to="/planet/amalin/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full" />
          </RouterLink>
        </div>
        <div class="absolute -top-2 -right-2 mobile:w-5 md:right-0 md:top-1/2">
          <RouterLink to="/planet/opushop/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full rotate-180" />
          </RouterLink>
        </div>
      </div>
      <div class="relative mb-16 flex flex-col items-center">
        <div class="bg-background">
          <div class="inline-block max-w-[520px] rounded-[4px] bg-white/20 px-10 py-11 text-center">
            <h4 class="mb-4">Get private consulting</h4>
            <p class="body-sm mb-6">
              Apply expert advice to your Web3 idea and make the most of it.
            </p>
            <MetamaskConnect
              :color="color"
              login-message="You must be logged in to book a private consulting."
            >
              <Btn
                href="https://calendly.com/kalmia-meet/one-on-one-web3-spaces-meeting"
                :class="color"
                target="_blank"
              >
                Book now
              </Btn>
            </MetamaskConnect>
          </div>
        </div>
        <p class="body-sm mt-6 max-w-[520px] text-center" :class="`text-${color}`">
          Make sure to book before the end of the Academy. You wouldn’t want to forget all those
          fresh ideas and knowledge you gained.
        </p>
      </div>
    </div>
    <PortalFooter />
    <div class="foreground" />
  </main>
</template>

<script lang="ts" setup>
// @ts-ignore
import AOS from 'aos';
import { SvgNames } from '~~/components/SvgInclude.vue';

useHead({
  title: 'Planet Trios',
});

definePageMeta({
  layout: 'portal',
});

onMounted(() => {
  AOS.init();
});

const color = 'purple';
</script>

<style lang="postcss" module></style>

<template>
  <main class="min-h-[100vh]">
    <Nav exit="/portal" :planet="SvgNames.PlanetOpushop" />
    <div class="container max-w-[1380px] pt-40 pb-20">
      <div class="relative mt-5 bg-background">
        <h1 class="mx-auto mb-6 px-4 text-center md:px-8">
          #4 Planet
          <span :class="`text-${color}`">Opushop</span>
        </h1>
        <p class="mx-auto mb-2 text-center md:max-w-[680px] lg:max-w-[887px]">
          Examine your Web3 idea or concept with our engineers in individually organized workshops,
          designed specifically to fit your project’s needs.
        </p>
        <p class="mx-auto mb-10 text-center md:max-w-[680px] lg:max-w-[887px]">
          Learn the nitty-gritty of the development process, and acquire the initial project
          architecture draft that will stand the test of building and add value to your brand.
        </p>
        <div class="absolute -top-2 -left-2 mobile:w-5 md:left-0 md:top-1/2">
          <RouterLink to="/planet/trios/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full" />
          </RouterLink>
        </div>
        <div class="absolute -top-2 -right-2 mobile:w-5 md:right-0 md:top-1/2">
          <RouterLink to="/planet/introdus/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full rotate-180" />
          </RouterLink>
        </div>
      </div>
      <div class="relative mb-16 flex flex-col items-center">
        <div class="bg-background">
          <div class="inline-block max-w-[520px] rounded-[4px] bg-white/20 px-10 py-11 text-center">
            <h4 v-if="isTokenVip" class="mb-4">
              Get your <span :class="`text-${color}`">FREE*</span> workshop!
            </h4>
            <h4 v-else class="mb-4">Yay, a discount!</h4>

            <p v-if="isTokenVip" class="body-sm mb-6">
              Happy days! Your VIP Token includes a free workshop with our experts. Go for it.
            </p>
            <div v-else class="mb-6">
              <p class="body-sm mb-6">
                Your Classic Token gives you access to a workshop at a special price.
              </p>
              <h6 class="text-green">12% DISCOUNT!</h6>
            </div>
            <MetamaskConnect
              :color="color"
              login-message="You must be logged in to book a workshop."
            >
              <Btn href="https://calendly.com/kalmia-meet/web3-spaces-workshop" :class="color">
                Book now
              </Btn>
            </MetamaskConnect>
          </div>
        </div>
        <p v-if="isTokenVip" class="body-sm mt-6 max-w-[420px] text-center">
          *Free workshop is available until November 21, so make sure to book in time.
        </p>
        <p v-else class="body-sm mt-6 max-w-[520px] text-center">
          *Workshop at a discounted price is available until November 21, so make sure to book in
          time. Upon booking, you’ll receive an invoice.
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
import { useAuthStore } from '~~/store/auth';

useHead({
  title: 'Planet Trios',
});

definePageMeta({
  layout: 'portal',
});

onMounted(() => {
  AOS.init();
});

const color = 'green';
const authStore = useAuthStore();

const isTokenVip = computed(() => {
  return authStore.tokenType === 'vip';
});
</script>

<style lang="postcss" module></style>

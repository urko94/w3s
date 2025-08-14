<template>
  <main class="min-h-[100vh]">
    <Nav exit="/portal" :planet="SvgNames.PlanetAmalin" />
    <div class="container max-w-[1380px] pt-40 pb-20">
      <div class="relative mt-5 bg-background">
        <h1 class="mx-auto mb-6 px-4 text-center md:px-8">
          #2 Planet
          <span :class="`text-${color}`">AMAlin</span>
        </h1>
        <p class="mx-auto mb-10 text-center md:max-w-[680px] lg:max-w-[887px]">
          Get hands-on advice on your ideas and challenges. For the Ask Me Anything sessions, pick
          the topics you’re interested in most, and vote with your NFT-enabled voting rights.
        </p>
        <div class="absolute -top-2 -left-2 mobile:w-5 md:left-0 md:top-1/2">
          <RouterLink to="/planet/introdus/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full" />
          </RouterLink>
        </div>
        <div class="absolute -top-2 -right-2 mobile:w-5 md:right-0 md:top-1/2">
          <RouterLink to="/planet/trios/">
            <SvgInclude :name="SvgNames.Arrow" class="w-full rotate-180" />
          </RouterLink>
        </div>
      </div>
      <div class="relative mb-16 text-center">
        <FormVote :id="1" :color="color" />
      </div>
      <div class="relative z-[1] mx-auto mb-20 grid max-w-[660px] grid-cols-1 gap-4 sm:grid-cols-2">
        <!-- TODO: Events -->
        <CardEvent v-bind="eventWeb3" :color="color" modal-width="1420px">
          <template #bottom>
            <div class="body-sm px-6 py-4 text-center">
              <strong>Have questions about the topic?</strong>
              <button class="body-sm uppercase text-blue">SEND YOUR QUESTION</button>
            </div>
          </template>
          <template #modalForm>
            <FormQuestion :color="color" />
          </template>
        </CardEvent>
        <CardEvent v-bind="eventVoting" :color="color"> </CardEvent>

        <CardEvent :color="color"> </CardEvent>
        <CardEvent :color="color"> </CardEvent>
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

const router = useRouter();

useHead({
  title: 'Planet Amalin',
});

definePageMeta({
  layout: 'portal',
});

onMounted(() => {
  AOS.init();
});

const color = 'blue';
const eventWeb3 = {
  name: 'Web3 project examples',
  date: new Date('2023-01-17T10:00:00'),
  time: '10:00-12:00',
  description: 'Discover the ways Web3 can help brands realize their vision and get inspired.',
};
const eventVoting = {
  name: 'Voting under way...',
  date: 'Jan, 2023',
  description: 'Select one of the topics above and get your questions ready.',
};
</script>

<style lang="postcss" module></style>

<template>
  <section class="relative my-20 flex flex-col items-center px-8">
    <div v-if="authStore.loggedIn" class="relative text-center" data-aos="fade-in">
      <h2 class="mx-auto max-w-[345px] sm:max-w-[550px] md:max-w-full">
        Conquer <span class="text-green">Web3 Spaces</span>
      </h2>
      <p class="body-lg mx-auto max-w-[330px] sm:max-w-[550px] md:max-w-[860px]">
        Web3 technologies have <strong>changed everything</strong>, business included. For your
        organization to remain relevant, you should learn how to harness their potential for growth.
      </p>
      <p class="body-lg mx-auto max-w-[330px] sm:max-w-[550px] md:max-w-[860px]">
        In this <strong>exclusive journey</strong> for only a few selected Web3-nauts, you’ll get a
        chance to explore charted planets devoted to <strong>specific topics</strong> with
        <strong>field experts</strong>.
      </p>
    </div>
    <div v-else class="relative text-center" data-aos="fade-in">
      <h2 class="mx-auto max-w-[345px] sm:max-w-[550px] md:max-w-full">
        Travel to the core of Web3
      </h2>
      <p class="body-lg mx-auto max-w-[330px] sm:max-w-[550px] md:max-w-[860px]">
        <span class="text-green">Web3 technologies</span> have changed everything, business
        included. For your organization to remain relevant,
        <strong>you should learn how to harness their potential for growth. </strong>
      </p>
      <p class="body-lg mx-auto max-w-[330px] sm:max-w-[550px] md:max-w-[860px]">
        In this exclusive journey for only a few selected Web3-nauts, you can get a chance to
        explore charted planets devoted to specific topics with field experts.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store/auth';
const authStore = useAuthStore();
</script>

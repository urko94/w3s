<template>
  <section class="relative z-[2] flex flex-col items-center justify-center px-8">
    <div class="relative w-full max-w-[1300px] text-center">
      <Btn
        v-if="!authStore.loggedIn"
        class="mb-4"
        width="550px"
        :tracking="true"
        tight
        @click="emit('redeemToken')"
      >
        <span v-if="isUniqueLink">Redeem your token</span>
        <span v-else>Apply for Academy access</span>
      </Btn>
      <p v-if="!authStore.loggedIn" class="body-md mb-10">How to apply?</p>
      <img
        v-if="!authStore.loggedIn"
        class="mx-auto mb-6"
        src="/assets/icons/arrow-down.svg"
        alt="icon-arrow"
      />
      <BtnDark href="https://web3-spaces.gitbook.io/web3-spaces-academy/other/faq" class="md:px-4">
        FAQ on
        <GitbookLogo />
      </BtnDark>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store/auth';

const props = defineProps({
  isUniqueLink: { type: Boolean, default: false },
});

const emit = defineEmits(['redeemToken']);
const authStore = useAuthStore();
</script>

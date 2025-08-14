<template>
  <main>
    <!-- Section - Main banner  -->
    <LandingWelcome :isUniqueLink="tokenUuid ? true : false" @redeemToken="showFirstModal()" />

    <!-- Section - Start your journey  -->
    <LandingStartJourney />

    <!-- Section - Planets -->
    <LandingJourney />

    <!-- Section - Redeem Token -->
    <LandingRedeemToken :isUniqueLink="tokenUuid ? true : false" @redeemToken="showFirstModal()" />

    <!-- Modal SendRequest -->
    <Modal :show="modalSendRequestVisible" width="1068px">
      <h2 class="mb-8 lg:px-5">Get in line for <span class="text-green"> the next launch</span></h2>
      <div class="mb-12 lg:mb-14 lg:px-5">
        <p class="body-sm mb-4 lg:max-w-[550px]">
          Eager to explore the space with the next generation of Web3-nauts? Submit your application
          and we'll get right back to you.
        </p>
        <FormSendRequest @success="showModalRequestSuccess()" />
      </div>
    </Modal>

    <!-- Modal Request success -->
    <Modal :show="modalRequestSuccessVisible" width="1068px" height="650px">
      <div class="flex min-h-[400px] flex-col pb-12 lg:h-full">
        <div class="flex flex-col items-center justify-center pb-6 lg:h-full">
          <div class="max-w-[720px] text-center">
            <h2 class="mb-6 text-green">Success!</h2>
            <p class="mb-6">We’ve received your application.</p>
            <p class="mb-6">
              Thank you for showing interest in the
              <strong class="text-green">Web3 Spaces Academy.</strong>
            </p>
            <p class="mb-16">
              If your application is accepted, you will get notified via e-mail when the next
              lift-off approaches.
            </p>

            <div class="flex items-center justify-center">
              <!-- Login in not available at this point -->
              <!-- <BtnWeb3Spaces /> -->
              <!-- <span class="body-sm ml-6 mr-10 italic">Or</span> -->
              <button
                class="body-sm uppercase tracking-[3px] underline"
                @click="modalRequestSuccessVisible = false"
              >
                Return home
              </button>
            </div>
          </div>
        </div>
        <div
          class="flex w-full items-center justify-center mobile:flex-col md:w-auto xl:space-x-3 xl:pl-10"
        >
          <span class="body-xxs">Read more about Web3 Spaces on</span>
          <a href="https://web3-spaces.gitbook.io/web3-spaces-academy/" target="_blank">
            <GitbookLogo />
          </a>
        </div>
      </div>
    </Modal>

    <!-- Modal Redeem token -->
    <Modal :show="modalRedeemTokenVisible" width="1068px">
      <div class="flex flex-col lg:flex-row">
        <div class="flex flex-col justify-between lg:mb-[74px] lg:w-[58%] lg:pr-[72px]">
          <div>
            <h2 class="mb-8">Redeem entrance token</h2>
            <p class="body-lg mb-12 font-bold">Simple way to join Web3 Spaces academy</p>
            <ul class="mb-10">
              <li class="relative pl-8 pb-4">
                <span
                  class="absolute top-1 left-0 h-[16px] w-[16px] rounded-[50%] bg-green shadow-green"
                >
                </span>
                <span class="absolute top-0 left-[7px] h-full w-[2px] overflow-hidden">
                  <svg viewBox="0 0 2 200" xmlns="http://www.w3.org/2000/svg">
                    <polyline
                      class="shadow-green"
                      fill="none"
                      stroke="#C4FCA3"
                      stroke-width="2"
                      :points="listLines(0, 3)"
                    />
                  </svg>
                </span>
                <p><strong>Set up</strong> your profile</p>
              </li>
              <li class="relative pl-8 pb-4">
                <span
                  class="absolute top-1 left-0 h-[16px] w-[16px] rounded-[50%] bg-green shadow-green"
                >
                </span>
                <span class="absolute top-0 left-[7px] h-full w-[2px] overflow-hidden">
                  <svg viewBox="0 0 2 200" xmlns="http://www.w3.org/2000/svg">
                    <polyline
                      class="shadow-green"
                      fill="none"
                      stroke="#C4FCA3"
                      stroke-width="2"
                      :points="listLines(1, 3)"
                    />
                  </svg>
                </span>
                <p>
                  <strong>How to connect wallet?</strong>
                  <a
                    href="https://web3-spaces.gitbook.io/web3-spaces-academy/general/how-does-it-work#how-to-claim-the-entrance-token"
                    target="_blank"
                  >
                    <GitbookLogo class="ml-2 inline" />
                  </a>
                </p>
              </li>
              <li class="relative pl-8 pb-4">
                <span
                  class="absolute top-1 left-0 h-[16px] w-[16px] rounded-[50%] bg-green shadow-green"
                >
                </span>
                <span class="absolute top-0 left-[7px] h-full w-[2px] overflow-hidden">
                  <svg viewBox="0 0 2 200" xmlns="http://www.w3.org/2000/svg">
                    <polyline
                      class="shadow-green"
                      fill="none"
                      stroke="#C4FCA3"
                      stroke-width="2"
                      :points="listLines(2, 3)"
                    />
                  </svg>
                </span>
                <p>Learn from <strong>Web3 Spaces experts</strong></p>
              </li>
            </ul>
            <p class="text-gold mb-8">
              Every 1 in 10 invited Web3-nauts gets a VIP token, which includes free workshop
              access. It could be you!
            </p>
            <Btn @click="showModalSetupProfile()">Set up profile</Btn>
          </div>
        </div>
        <div class="lg:w-[42%]">
          <div class="relative h-full">
            <img
              class="relative max-h-full w-full"
              src="/assets/images/tokenVip_rotated.svg"
              alt="icon-vip-token"
            />
            <img
              class="absolute top-[2%] left-0 max-h-full w-[90%]"
              src="/assets/images/token_rotated_locked.svg"
              alt="icon-token"
            />
          </div>
        </div>
      </div>
    </Modal>

    <!-- Modal Set up profile -->
    <Modal :show="modalSetupProfileVisible" width="1068px">
      <h2 class="mb-8 lg:px-5">Set up profile</h2>
      <div class="flex flex-col lg:flex-row">
        <div class="mb-12 lg:w-[56%] lg:px-5">
          <FormConnectWallet @success="showModalLoginSuccess()" />
        </div>
        <div class="lg:w-[44%] lg:px-5">
          <h6 class="mb-3 uppercase text-green">Heads up!</h6>
          <p class="sody-sm">
            Please input all the required data. The token you redeem will be linked to that data and
            can’t be changed later. But you will be able to transfer the token to another wallet.
          </p>
        </div>
      </div>
    </Modal>

    <!-- Modal Login success -->
    <Modal :show="modalLoginSuccessVisible" width="1068px">
      <div class="flex flex-col lg:flex-row">
        <div class="mb-8 lg:w-[56%] lg:px-5">
          <h2 class="mb-6">Hooray!</h2>
          <p v-if="isTokenVip" class="body-lg mb-2 font-bold">
            You have unlocked your token, and it’s VIP!
          </p>
          <p v-else class="body-lg mb-2 font-bold">You have unlocked your token!</p>
          <p class="mb-8">
            Your gate to Web3 Spaces is now open. Learn from experts covering advanced technologies,
            legal implications, concept building, and Web3 development.
          </p>
          <p class="mb-2">
            The Academy launches on
            <strong>OCTOBER 13, at 9 AM.</strong>
          </p>
          <p class="mb-8 font-bold">
            <span class="text-green">You’ll get an e-mail reminder,</span> so you don’t miss it.
          </p>
          <p class="mb-4">
            Your NFT will be available in your wallet in a few minutes. <br />
            You can connect with your Metamask after that and explore Spaces.
          </p>
          <div class="flex items-center">
            <button
              class="body-sm uppercase tracking-[3px] underline"
              @click="modalLoginSuccessVisible = false"
            >
              Return home
            </button>
          </div>
        </div>
        <div v-if="isTokenVip" class="mb-12 lg:w-[44%] lg:px-10">
          <img class="mx-auto" src="/assets/images/tokenVip.svg" alt="icon-vip-token" />
        </div>
        <div v-else class="mb-12 lg:w-[44%] lg:px-10">
          <img class="mx-auto" src="/assets/images/token.svg" alt="icon-token" />
        </div>
      </div>
    </Modal>
    <div class="foreground"></div>
  </main>
</template>

<script setup lang="ts">
// @ts-ignore
import AOS from 'aos';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { NftMetadataInterface, RedeemNftInfoResponseInterface } from '~~/lib/Interface';
import { useAuthStore } from '~~/store/auth';

useHead({
  title: 'Web 3 Spaces',
});

definePageMeta({
  layout: 'default',
});

onMounted(() => {
  AOS.init();

  if (tokenUuid.value) {
    redeemNftInfo();
  }
});

const route = useRoute();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const NFT_URL = `${config.API_BASE}/nfts`;

const tokenUuid = computed(() => {
  return route.query?.tokenUuid && route.query.tokenUuid.length > 10 ? route.query.tokenUuid : null;
});
const isTokenVip = computed(() => {
  return authStore.tokenType === 'vip';
});

async function redeemNftInfo() {
  const URL = `${NFT_URL}/redeem-info/${tokenUuid.value}`;

  try {
    const redeemNftInfoResponse: AxiosResponse = await axios.get(URL);
    const data: RedeemNftInfoResponseInterface = redeemNftInfoResponse.data;

    authStore.updateUser(data.user);
    authStore.updateTokenRequest(data.creationRequest);
    authStore.message = data.message;
    authStore.user.uuid = tokenUuid.value?.toString() || '';

    // Open redeem modal
    setTimeout(() => showModalRedeemToken(), 500);
  } catch (e: unknown) {
    console.error(e);
  }
}

/**
 * Modals
 */
function showFirstModal() {
  if (tokenUuid.value) {
    showModalRedeemToken();
  } else {
    showModalSendRequest();
  }
}

/**
 * Modal Send request
 */
const modalSendRequestVisible = ref(false);
function showModalSendRequest() {
  modalSendRequestVisible.value = false;
  setTimeout(() => (modalSendRequestVisible.value = true), 1);
}

/**
 * Modal Request success
 */
const modalRequestSuccessVisible = ref(false);
function showModalRequestSuccess() {
  modalSendRequestVisible.value = false;
  modalRequestSuccessVisible.value = false;
  setTimeout(() => (modalRequestSuccessVisible.value = true), 1);
}

/**
 * Modal Redeem token
 */
const modalRedeemTokenVisible = ref(false);
function showModalRedeemToken() {
  modalRedeemTokenVisible.value = false;
  setTimeout(() => (modalRedeemTokenVisible.value = true), 1);

  setTimeout(() => {
    AOS.init();
  }, 100);
}

function listLines(index: number, numOfItems: number) {
  const points = [];
  if (index > 0) {
    points.push({ x: 0, y: 0 });
  }
  points.push({ x: 0, y: 10 });

  if (index < numOfItems - 1) {
    points.push({ x: 0, y: 200 });
  }

  return points.map(p => `${p.x},${p.y}`).join(' ');
}

/**
 * Modal Set up profile
 */
const modalSetupProfileVisible = ref(false);
function showModalSetupProfile() {
  modalRedeemTokenVisible.value = false;
  modalSetupProfileVisible.value = false;
  setTimeout(() => (modalSetupProfileVisible.value = true), 1);
}

/**
 * Modal Login Success
 */
const modalLoginSuccessVisible = ref(false);
function showModalLoginSuccess() {
  modalSetupProfileVisible.value = false;
  modalLoginSuccessVisible.value = false;
  setTimeout(() => (modalLoginSuccessVisible.value = true), 1);
}
</script>

<style lang="postcss" scoped>
.waves {
  min-width: calc(500px + 50vw);
}
</style>

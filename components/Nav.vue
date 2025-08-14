<template>
  <nav class="absolute top-0 z-10 w-full">
    <div class="container mx-auto flex max-w-[1680px] flex-wrap px-5 py-4 md:px-10 md:py-6">
      <!-- Left side - logo, exit-->
      <div class="flex w-1/2 items-start mobile:flex-col md:w-1/4 md:items-center">
        <RouterLink to="/">
          <img
            src="/assets/images/logo/Web3Spaces.svg"
            class="min-w-[80px] py-1"
            alt="Web3Spaces"
            width="100"
            height="28"
          />
        </RouterLink>
        <BtnDark
          v-if="exit"
          size="sm"
          borderRadius="60px"
          class="px-4 md:ml-6"
          tight
          @click="goBack()"
        >
          <SvgInclude :name="SvgNames.Close" class="mr-3 self-center" />
          <span>Exit planet</span>
        </BtnDark>
      </div>
      <!-- Middle - events notifications, planets -->
      <div class="w-full mobile:order-1 md:w-1/2">
        <NotificationEvents v-if="events" :events="events" />
        <div v-else-if="planet" class="relative">
          <div
            class="absolute left-1/2 -top-[150px] mx-auto -ml-[60px] h-[120px] w-[120px] sm:-top-[120px] md:-top-[100px] md:-ml-[120px] md:h-[240px] md:w-[240px]"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <SvgInclude :name="planet" class="h-full w-full" />
          </div>
        </div>
        <div
          v-else
          class="flex flex-col justify-center divide-white/[.4] xl:flex-row xl:space-x-10 xl:divide-x"
        >
          <div class="my-2 flex w-full items-center justify-center space-x-6 md:my-0 md:w-auto">
            <h6 class="whitespace-nowrap">Powered by</h6>
            <a href="https://www.kalmia.si" target="_blank" title="Kalmia">
              <img
                src="/assets/images/logo/kalmia.svg"
                class="mx-auto"
                alt="Kalmia Logo"
                width="126"
                height="15"
              />
            </a>
          </div>
          <div class="flex w-full items-center justify-center md:w-auto xl:space-x-3 xl:pl-10">
            <span class="body-xxs">Read more about Web3 Spaces on</span>
            <a href="https://web3-spaces.gitbook.io/web3-spaces-academy/" target="_blank">
              <GitbookLogo />
            </a>
          </div>
        </div>
      </div>
      <!-- Right side - user account-->
      <div v-if="authStore.loggedIn" class="relative flex w-1/2 items-center justify-end md:w-1/4">
        <div class="mr-4 flex items-center md:mr-7">
          <span class="whitespace-nowrap">{{ truncate(userAccount.wallet) }}</span>
        </div>
        <BtnDark
          size="sm"
          borderRadius="60px"
          class="px-[7px] md:px-4"
          tight
          @click="showAccountDropdown = !showAccountDropdown"
        >
          <span class="hidden leading-9 md:inline-block"
            >{{ userAccount.firstname }} {{ userAccount.lastname }}</span
          >
          <img
            src="/assets/images/portal/spaceman-head.svg"
            class="md:ml-3"
            alt="Web3Spaces spaceman head"
            width="24"
            height="26"
          />
        </BtnDark>
        <div
          v-if="showAccountDropdown"
          class="fixed top-0 right-0 bottom-0 left-0"
          @click="showAccountDropdown = false"
        ></div>
        <div
          v-if="showAccountDropdown"
          class="absolute top-0 right-0 min-w-[330px] rounded-[4px] bg-background"
          :class="dropdownClass"
          data-aos="fade-left"
        >
          <div class="flex flex-col items-center p-5 text-center">
            <img
              src="/assets/images/portal/spaceman-head.svg"
              class="mb-1"
              alt="Web3Spaces spaceman head"
              width="64"
              height="68"
            />
            <strong class="mb-1">{{ userAccount.firstname }} {{ userAccount.lastname }}</strong>
            <p class="mb-4 whitespace-nowrap">{{ truncate(userAccount.wallet) }}</p>
            <button class="mb-6 inline-flex items-center" @click="showModalProfileSettings()">
              <SvgInclude :name="SvgNames.Edit" />
              <span class="ml-2">Edit my profile</span>
            </button>
            <hr class="mb-4 w-full opacity-20" />
            <div class="mb-3 inline-block rounded-[60px] bg-white/20 py-2 px-4">
              <span class="mr-2">Yout token: </span>
              <span v-if="isTokenVip" class="text-gold">VIP Token</span>
              <span v-else>Classic Token</span>
            </div>
            <p class="mb-5 hidden">Transfer my token</p>
            <BtnWeb3Spaces
              v-if="currentRouteName !== 'portal'"
              class="!bg-transparent px-0 !text-white"
              size="md"
              min-width="180px"
            ></BtnWeb3Spaces>
            <hr class="mb-4 w-full opacity-20" />
            <button class="mb-1 uppercase" @click="logout()">Log out</button>
          </div>
        </div>
      </div>
      <div
        v-else-if="currentRouteName !== 'portal'"
        class="flex w-1/2 items-center justify-end md:w-1/4"
      >
        <BtnWeb3Spaces />
      </div>
      <div v-else class="flex w-1/2 items-center justify-end md:w-1/4">
        <MetamaskConnect
          class="white px-4"
          size="sm"
          color="gray-lighter"
          :class="btnWhiteClass"
          minHeight="38px"
          minWidth="223px"
          width="auto"
          :tracking="false"
          style="border-radius: 60px"
        />
      </div>
    </div>
  </nav>

  <!-- Modal Set up profile -->
  <Modal :show="modalProfileSettingsVisible" width="1068px">
    <h2 class="mb-10">Profile settings</h2>
    <div class="flex max-h-[85vh] flex-col pb-6 lg:flex-row">
      <div class="mb-12 lg:w-[56%] lg:px-5">
        <div class="flex flex-col items-center">
          <div class="relative mx-auto mb-4 inline-block rounded-[50%] p-11">
            <div class="spaceman-bg absolute left-0 top-0 h-full w-full rounded-[50%]"></div>
            <div class="foreground rounded-[50%]"></div>
            <img
              src="/assets/images/portal/spaceman-head.svg"
              class="relative h-[196px] object-contain"
              alt="Web3Spaces spaceman head"
              width="196"
              height="196"
            />
          </div>
          <strong class="body-sm mb-2 tracking-widest">Connected wallet</strong>
          <p class="mb-4">{{ authStore.user.wallet }}</p>
          <div class="mb-3 inline-block rounded-[60px] bg-white/20 py-2 px-4">
            <span class="mr-2">Yout token: </span>
            <span v-if="isTokenVip" class="text-gold">VIP Token</span>
            <span v-else>Classic Token</span>
          </div>
        </div>
      </div>
      <div class="lg:w-[44%] lg:px-5">
        <FormProfile @close="closeModalProfileSetting()" />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~~/store/auth';
import { truncate } from '~~/utils/strings';
import { SvgNames } from './SvgInclude.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'green',
    validator: (value: string) => ['orange', 'green', 'purple', 'blue'].includes(value),
  },
  exit: { type: String, default: null },
  planet: { type: String, default: null },
  events: { type: Array, default: null },
});

const authStore = useAuthStore();
const router = useRouter();
const currentRouteName = router.currentRoute.value.name;

function goBack() {
  if (window.history.state.back !== null && !window.history.state.back.includes('planet')) {
    router.go(-1);
  }
  router.push(props.exit);
}

function logout() {
  authStore.logout();
  router.push('/');
}

const isTokenVip = computed(() => {
  return authStore.tokenType === 'vip';
});

/**
 * User Account
 */
const userAccount = ref(authStore.user);
const showAccountDropdown = ref(false);

const dropdownClass = computed(() => {
  return [
    {
      'border-orange shadow-orange': props.color == 'orange',
      'border-green shadow-green': props.color == 'green',
      'border-purple shadow-purple': props.color == 'purple',
      'border-blue shadow-blue': props.color == 'blue',
    },
  ];
});

/**
 * Modal Profile settings
 */
const modalProfileSettingsVisible = ref(false);
const showModalProfileSettings = () => {
  modalProfileSettingsVisible.value = false;
  setTimeout(() => (modalProfileSettingsVisible.value = true), 1);
};

function closeModalProfileSetting() {
  modalProfileSettingsVisible.value = false;
}

/** Btn login class */
const $style = useCssModule();
const btnWhiteClass = computed(() => {
  return [$style.white];
});
</script>

<style lang="postcss" scoped>
.spaceman-bg {
  background: linear-gradient(180deg, #fbf6ed 0%, #ffffff 0.01%, rgba(255, 255, 255, 0) 79.17%);
  box-shadow: inset 0px 4px 4px rgb(0 0 0 / 25%);
  opacity: 0.6;
}
</style>

<style lang="postcss" module>
a.white,
button.white {
  color: theme('colors.black');
  background: theme('colors.white');
  transition: none;
  letter-spacing: 0;
  text-transform: none;
  font-weight: normal;

  &:hover {
    letter-spacing: 0;
  }
}
</style>

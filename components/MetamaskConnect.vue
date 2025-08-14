<template>
  <div class="relative inline-block">
    <Btn
      v-if="isLoggedIn"
      v-bind="$attrs"
      :size="size"
      class="px-4"
      :class="color"
      :min-width="minWidth"
      :loading="loading"
      tight
      @click="onClick()"
    >
      <slot> </slot>
    </Btn>
    <template v-else>
      <p v-if="loginMessage" class="body-sm mb-2 opacity-80">
        {{ loginMessage }}
      </p>
      <BtnWhite
        v-bind="$attrs"
        :size="size"
        class="px-4"
        :class="color"
        :min-width="minWidth"
        tight
        @click="onClick()"
      >
        <strong> Connect with Metamask </strong>
      </BtnWhite>
    </template>
    <span
      v-if="errors"
      class="body-xs absolute left-0 top-full whitespace-normal text-center text-red"
      v-html="errors"
    >
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~~/store/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthMsgResponseInterface, LoginResponseInterface } from '~~/lib/Interface';
import { metamaskNotSupportedMessage } from '~~/utils/misc';

const props = defineProps({
  size: { type: String, default: 'sm' },
  minWidth: { type: String, default: '215px' },
  color: {
    type: String,
    default: 'white',
    validator: (value: string) => ['white', 'orange', 'green', 'purple', 'blue'].includes(value),
  },
  loginMessage: { type: String, default: '' },
});
const emit = defineEmits(['click']);

const authStore = useAuthStore();
const config = useRuntimeConfig();
const { userAccount } = useProvider();
const { getMessageSignature } = useContracts();
const {
  isMetamaskReady,
  isMetamaskConnected,
  isMetamaskChainConnected,
  connectToAccount,
  connectToChain,
} = useWalletAccounts();
const loading = ref(false);
const errors = ref('');

const isLoggedIn = computed(() => {
  return authStore.jwt && isMetamaskReady.value;
});

/**
 * Sign an api message w/ wallet, confirming user authenticity.
 * Then try to find account for wallet address.
 */
async function onClick(ev: MouseEvent) {
  if (isLoggedIn.value) {
    emit('click', ev);
    return;
  }

  loading.value = true;
  errors.value = '';

  if (!isMetamaskReady.value) {
    if (!isMetamaskConnected.value) {
      await connectToAccount();
    }
    if (!isMetamaskChainConnected.value) {
      await connectToChain();
    }
  }

  try {
    const USERS_URL = `${config.API_BASE}/users`;
    // Get msg to sign and a timestamp from api
    const authMsgResponse: AxiosResponse = await axios.get(`${USERS_URL}/auth-msg`);
    const { message, timestamp } = authMsgResponse.data as AuthMsgResponseInterface;

    if (!!message && !!timestamp) {
      // Get user's signature
      const signature = await getMessageSignature(message);

      if (signature) {
        try {
          const PAYLOAD = {
            wallet: userAccount.value,
            signature,
            timestamp,
          };
          /** Get api user for wallet address */
          const loginResponse: AxiosResponse = await axios.post(`${USERS_URL}/login`, PAYLOAD);
          const { authToken, profile } = loginResponse.data as LoginResponseInterface;

          authStore.saveUser({
            jwt: authToken,
            user: profile,
          });

          authStore.getTokens();

          // router.push('/portal/');
        } catch (e: unknown) {
          console.error(e);

          if (e instanceof AxiosError && e?.response?.data?.message === 'SIGNATURE_INVALID') {
            console.error({
              title: 'Signature error',
              message: 'Invalid signature',
            });
            errors.value = 'Signature error: Invalid signature';
          } else if (
            e instanceof AxiosError &&
            e?.response?.data?.message === 'USER_DOES_NOT_HOLD_REQUIRED_TOKENS'
          ) {
            console.warn({
              title: 'No NFTs detected in your wallet',
              message: 'You need to own at least one NFT to sign in',
            });
            errors.value =
              'No NFTs detected in your wallet: You need to own at least one NFT to sign in';
          } else if (e instanceof AxiosError && e?.response?.data?.message === 'INVALID_REQUEST') {
            console.warn({
              title: 'Invalid request',
              message: 'You need to own at least one NFT to sign in',
            });
            errors.value = "No NFTs detected in your wallet: You don't have permission to sign in";
          } else {
            errors.value = 'Something went wrong, please try again later.';
          }
        }
      } else {
        console.error({
          title: 'Signature error',
          message: 'Could not capture your signature',
        });
        errors.value = metamaskNotSupportedMessage();
      }
    }
  } catch (e) {
    console.error(e);
    errors.value = 'Something went wrong, please try again later.';
  }
  loading.value = false;
}
</script>

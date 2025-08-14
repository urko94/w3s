<template>
  <div class="relative mx-auto">
    <form @submit.prevent="connectWallet()" novalidate>
      <FormFieldInput
        v-model="fields.company"
        label="Company*"
        :error="v$.company?.$errors[0]?.$message.toString()"
      />
      <div class="flex">
        <div class="w-1/2 pr-[6px]">
          <FormFieldInput
            v-model="fields.firstname"
            label="First name*"
            :error="v$.firstname?.$errors[0]?.$message.toString()"
          />
        </div>
        <div class="w-1/2 pl-[6px]">
          <FormFieldInput
            v-model="fields.lastname"
            label="Last name*"
            :error="v$.lastname?.$errors[0]?.$message.toString()"
          />
        </div>
      </div>
      <FormFieldInput
        v-model="fields.email"
        type="email"
        label="E-mail address*"
        name="email"
        :error="v$.email?.$errors[0]?.$message.toString()"
      />
      <FormFieldInput
        v-model="fields.position"
        label="Position in company*"
        :error="v$.position?.$errors[0]?.$message.toString()"
      />
      <FormFieldInput
        v-model="fields.linkedin"
        label="Your linkedIn profile"
        :error="v$.linkedin?.$errors[0]?.$message.toString()"
      />
      <FormFieldCheckbox
        v-model="fields.email_notifications_bool"
        label="I would like to be notified of future Web3 Spaces Academy events and understand that I can withdraw my consent at any time."
        :error="v$.email_notifications_bool?.$errors[0]?.$message.toString()"
      />
      <Btn
        type="submit"
        class="mt-6"
        :class="color"
        :loading="loading"
        :disabled="!walletConnectEnabled"
        width="370px"
      >
        CONNECT WALLET
      </Btn>
      <p class="body-xs my-2 opacity-80">Don’t worry, no transfers are needed from your side.</p>
      <div v-if="errors" class="body-sm float-left text-red" v-html="errors"></div>
      <div v-if="!walletConnectEnabled" class="body-sm float-left text-red">
        Your profile doesn't have a valid token UUID or your token has already been redeemed.
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~~/store/auth';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { metamaskNotSupportedMessage } from '~~/utils/misc';

const props = defineProps({
  color: {
    type: String,
    default: 'green',
    validator: (value: string) => ['orange', 'green', 'purple', 'blue'].includes(value),
  },
});

const emit = defineEmits(['success']);

const walletConnectEnabled = computed(() => {
  return authStore.message && authStore.user.id && authStore.user.uuid;
});

const authStore = useAuthStore();
const config = useRuntimeConfig();
const errors = ref('');
const loading = ref(false);

const fields = reactive({
  firstname: authStore.user.firstname,
  lastname: authStore.user.lastname,
  email: authStore.user.email,
  company: authStore.user.company,
  position: authStore.user.position,
  linkedin: authStore.user.linkedin,
  email_notifications_bool: authStore.user.email_notifications ? true : false,
});
const rules = {
  firstname: { $autoDirty: true, required },
  lastname: { $autoDirty: true, required },
  email: { $autoDirty: false, required, email },
  company: { $autoDirty: true, required },
  position: { $autoDirty: true, required },
  linkedin: {},
  email_notifications_bool: { required },
};
const v$ = useVuelidate(rules, fields);

const { isMetamaskConnected, connectToAccount, connectToChain } = useWalletAccounts();
const { getMessageSignature } = useContracts();
const { userAccount } = useProvider();

async function connectWallet() {
  loading.value = true;

  await connectToAccount();
  await connectToChain();

  authStore.setSignature(await getMessageSignature(authStore.message));
  await redeemNft();

  loading.value = false;
}

/**
 * Redeem NFT
 */
async function redeemNft() {
  const URL = `${config.API_BASE}/nfts/redeem-nft`;
  const PAYLOAD = {
    ...fields,
    uuid: authStore.user.uuid,
    wallet: userAccount.value,
    signature: authStore.user.signature,
    terms_accepted_bool: true,
  };

  try {
    const options = {
      headers: authStore.axiosHeaders,
      params: {},
    };

    const response: AxiosResponse = await axios.post(URL, PAYLOAD, options);

    if (response.data && response.data.success && isMetamaskConnected.value) {
      errors.value = '';
      emit('success');
    } else {
      errors.value = 'Something went wrong, please try again later.';
    }
  } catch (e: unknown) {
    if (
      e instanceof AxiosError &&
      e.response?.data.errors[0].message === 'USER_WALLET_ADDRESS_NOT_PRESENT'
    ) {
      console.error({
        title: 'Signature error',
        message: 'Invalid signature',
      });
      errors.value = metamaskNotSupportedMessage();
    } else if (e instanceof AxiosError && e.response?.data?.errors?.length > 0) {
      errors.value = e.response?.data.errors[0].message.replaceAll('_', ' ');
    } else {
      errors.value = 'Something went wrong, please try again later.';
    }
    console.error(e);
  }
}
</script>

<template>
  <div class="relative mx-auto">
    <form @submit.prevent="handleSubmit()" novalidate>
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
        v-model="fields.company"
        label="Company*"
        :error="v$.company?.$errors[0]?.$message.toString()"
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
      <div class="mt-10 mb-5 flex">
        <Btn type="submit" :class="color" :loading="loading" width="157px" min-width="157px">
          SAVE
        </Btn>
        <Btn class="transparent ml-7" width="200px" min-width="200px" @click="emit('close')" tight>
          Cancel
        </Btn>
      </div>

      <div v-if="errors" class="body-sm float-left text-red">
        {{ errors }}
      </div>

      <p v-if="success" class="body-sm float-left flex items-center">
        <SvgInclude :name="SvgNames.Checkmark" />
        <span class="ml-4">{{ success }}</span>
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup="props, { emit }">
import { useAuthStore } from '~~/store/auth';
import { SvgNames } from '../SvgInclude.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios, { AxiosError, AxiosResponse } from 'axios';

const props = defineProps({
  color: {
    type: String,
    default: 'green',
    validator: (value: string) => ['orange', 'green', 'purple', 'blue'].includes(value),
  },
});

const emit = defineEmits(['close']);

const authStore = useAuthStore();
const config = useRuntimeConfig();
const errors = ref('');
const success = ref('');
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

async function handleSubmit() {
  await v$.value.$validate();

  if (v$.value.$invalid) {
    return;
  }
  loading.value = true;

  const PROFILE_URL = `${config.API_BASE}/users/edit-profile`;
  const options = {
    headers: authStore.axiosHeaders,
    params: {},
  };

  try {
    const response: AxiosResponse = await axios.put(PROFILE_URL, fields, options);

    if (!response.data) {
      throw new Error('Service error.');
    }
    // Update user with new data
    authStore.saveUser({ user: response.data });

    success.value = 'Profile updated';
    errors.value = '';

    // Close modal
    setTimeout(() => emit('close'), 1000);
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response?.data?.errors?.length > 0) {
      errors.value = e.response?.data.errors[0].message.replaceAll('_', ' ');
    } else {
      errors.value = 'Something went wrong, please try again later.';
    }
    console.error(e);
  }

  loading.value = false;
}
</script>

<style lang="postcss" module></style>

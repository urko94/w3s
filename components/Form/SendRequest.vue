<template>
  <div class="relative">
    <form @submit.prevent="onSubmit()" novalidate>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 md:pr-[6px]">
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
        </div>
        <div class="w-full md:w-1/2 md:pl-[6px]">
          <FormFieldTextarea
            v-model="fields.desc"
            label="Why do you want to join the W3S Academy?*"
            class="h-[154px]"
            :error="v$.desc?.$errors[0]?.$message.toString()"
          />
          <FormFieldTextarea
            v-model="fields.idea"
            label="Already have an idea for a Web3 or NFT project?"
            class="h-[154px]"
            :error="v$.idea?.$errors[0]?.$message.toString()"
          />
        </div>
      </div>
      <FormFieldCheckbox
        v-model="fields.terms_accepted_bool"
        label="Yes, sign me up! By checking this box, I agree to receive news and updates related to the current Web3 Spaces Academy event only, and I accept to be tagged on announcement posts on LinkedIn and Twitter by the official Kalmia account.*"
        class="mb-0"
        :error="v$.terms_accepted_bool?.$errors[0]?.$message.toString()"
      />
      <FormFieldCheckbox
        v-model="fields.email_notifications_bool"
        label="I would like to be notified of future Web3 Spaces Academy events and understand that I can withdraw my consent at any time."
        :error="v$.email_notifications_bool?.$errors[0]?.$message.toString()"
      />
      <div class="mt-6 flex">
        <Btn type="submit" :class="color" :loading="loading" width="420px">Submit application</Btn>
      </div>

      <div v-if="errors" class="body-sm float-left text-red">
        {{ errors }}
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '~~/store/auth';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

const props = defineProps({
  color: {
    type: String,
    default: 'green',
    validator: (value: string) => ['orange', 'green', 'purple', 'blue'].includes(value),
  },
});
const emit = defineEmits(['success']);

const config = useRuntimeConfig();
const authStore = useAuthStore();
const errors = ref('');
const loading = ref(false);
const mustBeTrue = (value: Boolean) => value === true;

const fields = reactive({
  firstname: '',
  lastname: '',
  email: '',
  company: '',
  position: '',
  linkedin: '',
  desc: '',
  idea: '',
  terms_accepted_bool: false,
  email_notifications_bool: false,
});
const rules = {
  firstname: { $autoDirty: true, required },
  lastname: { $autoDirty: true, required },
  email: { $autoDirty: false, required, email },
  company: { $autoDirty: true, required },
  position: { $autoDirty: true, required },
  linkedin: {},
  desc: { $autoDirty: true, required },
  idea: {},
  terms_accepted_bool: {
    $autoDirty: true,
    required,
    mustBeTrue: helpers.withMessage('Term must be accepted', mustBeTrue),
  },
  email_notifications_bool: { $autoDirty: true },
};
const v$ = useVuelidate(rules, fields);

async function onSubmit() {
  await v$.value.$validate();

  if (v$.value.$invalid) {
    return;
  }

  const URL = `${config.API_BASE}/users/signup`;
  const options = {
    headers: authStore.axiosHeaders,
    params: {},
  };
  loading.value = true;

  try {
    const response: AxiosResponse = await axios.post(URL, fields, options);

    if (!response.data) {
      throw new Error('Service error.');
    }

    emit('success');
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response?.data?.errors?.length > 0) {
      errors.value = e.response?.data.errors[0].message.replaceAll('_', ' ');
    } else if (e instanceof AxiosError && e.response?.data?.message) {
      errors.value = e.response.data.message;
    } else {
      errors.value = 'Something went wrong, please try again later.';
    }
    console.error(e);
  }

  loading.value = false;
}
</script>

<style lang="postcss" module></style>

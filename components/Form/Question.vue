<template>
  <div class="relative mx-auto">
    <!-- Allow asking questions only to Logged in users  -->
    <form v-if="authStore.loggedIn" @submit.prevent="handleSubmit()">
      <p class="body-sm mb-3 font-bold" :class="`text-${color}`">
        Others may want to learn about it, too. Submit your topic suggestion, and if chosen, we'll
        discuss it in the next AMA session.
      </p>
      <FormFieldTextarea
        v-model="fields.question"
        label="What would you like to understand more?"
        class="h-[125px]"
        :error="v$.question?.$errors[0]?.$message.toString()"
      />
      <div :class="[{ 'float-right': type === 'right' }, { 'mt-8': type === 'center' }]">
        <Btn
          type="submit"
          :class="color"
          :loading="loading"
          :tracking="false"
          min-width="0"
          width="157px"
          minHeight="50px"
        >
          <span v-if="type === 'right'">Send</span>
          <span v-else>Submit</span>
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
    <div v-else>
      <MetamaskConnect login-message="You must be logged in to ask questions."></MetamaskConnect>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SvgNames } from '../SvgInclude.vue';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useAuthStore } from '~~/store/auth';

const props = defineProps({
  color: {
    type: String,
    default: 'green',
    validator: (value: string) => ['orange', 'green', 'purple', 'blue'].includes(value),
  },
  type: {
    type: String,
    default: 'right',
    validator: (value: string) => ['center', 'right'].includes(value),
  },
});

const config = useRuntimeConfig();
const authStore = useAuthStore();
const errors = ref('');
const success = ref('');
const loading = ref(false);

const fields = reactive({
  question: '',
});
const rules = {
  question: { $autoDirty: true, required },
};
const v$ = useVuelidate(rules, fields);

async function handleSubmit() {
  await v$.value.$validate();

  if (v$.value.$invalid) {
    return;
  }
  loading.value = true;

  const URL = `${config.API_BASE}/ama/submit`;
  const PAYLOAD = {
    email: authStore.user.email,
    question: fields.question,
  };
  const options = {
    headers: authStore.axiosHeaders,
    params: {},
  };

  try {
    const response: AxiosResponse = await axios.post(URL, PAYLOAD, options);

    if (!response.data) {
      success.value = '';
      errors.value = 'Something went wrong, please try again later.';
      throw new Error('Service error.');
    }
    success.value = 'Thank you for your questions!';
    errors.value = '';
  } catch (e: unknown) {
    success.value = '';
    errors.value = 'Something went wrong, please try again later.';
    console.error(e);
  }

  loading.value = false;
}
</script>

<style lang="postcss" module></style>

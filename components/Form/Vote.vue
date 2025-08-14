<template>
  <div class="relative flex flex-col items-center">
    <form
      v-if="authStore.loggedIn && id && surveryQuestion && surveryAnswers"
      @submit.prevent="handleSubmit()"
    >
      <div class="inline-flex flex-col items-center bg-background">
        <p class="mb-6 text-center">
          <strong>{{ surveryQuestion }}</strong>
        </p>
        <div v-for="topic in surveryAnswers" class="field checkbox w-96">
          <input
            type="radio"
            :id="`${topic.id}`"
            class="invisible absolute"
            :value="topic.id"
            v-model="selectedAnswer"
            :disabled="surveryAnswer !== '' && surveryAnswer !== null"
          />
          <label
            :for="`${topic.id}`"
            :class="{
              'pointer-events-none cursor-default': surveryAnswer !== '' && surveryAnswer !== null,
            }"
          >
            <span>{{ topic.text }}</span>
            <span
              v-if="topic.text"
              class="absolute left-0 top-0 h-full rounded-l-[60px]"
              :class="[
                btnClass,
                { 'rounded-r-[10px]': topic.percent === 97 },
                { 'rounded-r-[30px]': topic.percent === 98 },
                { 'rounded-r-[40px]': topic.percent === 99 },
                { 'rounded-r-[60px]': topic.percent === 100 },
              ]"
              :style="{ width: topic.percent + '%' }"
            ></span>
          </label>
        </div>
        <div>
          <Btn
            v-if="!surveryAnswer"
            type="submit"
            :class="color"
            :loading="loading"
            :tracking="false"
            min-width="0"
            width="157px"
            minHeight="50px"
          >
            Vote now
          </Btn>
        </div>
      </div>
    </form>
    <div v-else-if="info">
      <Btn :class="color" class="mx-auto" @click="showModal()">Suggest topic</Btn>
      <div class="mt-5 text-center" :class="`text-${color}`">
        <strong>{{ info }}</strong>
      </div>
    </div>
    <div v-if="errors" class="mt-5 text-center text-red">
      {{ errors }}
    </div>

    <p v-if="success" class="mt-5 text-center text-blue">
      {{ success }}
    </p>
  </div>
  <Modal :show="modalVisible" width="1068px" :color="color">
    <div class="max-h-[85vh] min-h-[600px] text-center">
      <h2 class="mt-4 mb-8">
        Suggest
        <span :class="`text-${color}`">topic</span>
      </h2>
      <p class="body-sm mx-auto mb-14 max-w-[640px]">
        Not sure you understand the utility of NFTs? Looking for ways to enter the Metaverse?
        Perhaps you want to implement smart contracts into your business?
      </p>
      <FormQuestion :color="color" type="center" class="max-w-[640px]"> </FormQuestion>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '~~/store/auth';
import { SurveryInterface, SurveryAnswerInterface } from '~~/lib/Interface';

const authStore = useAuthStore();

const props = defineProps({
  id: { type: Number, required: true },
  color: {
    type: String,
    default: 'green',
    validator: (value: string) => ['orange', 'green', 'purple', 'blue'].includes(value),
  },
});

const btnClass = computed(() => {
  return [
    {
      'bg-orange/40': props.color == 'orange',
      'bg-green/40': props.color == 'green',
      'bg-purple/40': props.color == 'purple',
      'bg-blue/40': props.color == 'blue',
    },
  ];
});

const surveryQuestion = ref('');
const surveryAnswers = ref<Array<SurveryAnswerInterface>>([]);
const surveryAnswer = ref('');
const selectedAnswer = ref('');
const allAnswers = ref(0);

const success = ref('');
const info = ref('');
const errors = ref('');
const loading = ref(false);

const config = useRuntimeConfig();
const SURVEY_URL = `${config.API_BASE}/surveys/`;

const modalVisible = ref(false);
const showModal = () => {
  modalVisible.value = false;
  setTimeout(() => (modalVisible.value = true), 1);
};

onMounted(() => {
  fetchSurvey(props.id);
});

async function fetchSurvey(id: Number) {
  info.value = '';
  success.value = '';
  const options = {
    headers: authStore.axiosHeaders,
    params: {},
  };

  try {
    const surveyRes: AxiosResponse = await axios.get(SURVEY_URL + id, options);
    const data: SurveryInterface = surveyRes.data;

    if (data.isActive) {
      surveryQuestion.value = data.text;
      surveryAnswers.value = data.answerList;
      surveryAnswer.value = data.userAnswer;

      if (data.userAnswer) {
        selectedAnswer.value = data.userAnswer;
        success.value = `You have already voted. The most chosen will be the topic in your next AMA session.`;

        recalculateAnswers();
      }
    } else {
      info.value = 'Once voting opens, you will be notified via e-mail.';
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response?.data?.message) {
      info.value = 'Once voting opens, you will be notified via e-mail.';
    }
    console.error(e);
  }
}

async function handleSubmit() {
  if (!selectedAnswer.value) {
    errors.value = 'Please select one field.';
    return;
  }

  const URL = SURVEY_URL + props.id + '/response';
  const PAYLOAD = {
    survey_answer_id: selectedAnswer.value,
  };
  const options = {
    headers: authStore.axiosHeaders,
    params: {},
  };
  loading.value = true;
  errors.value = '';

  try {
    const surveyRes: AxiosResponse = await axios.post(URL, PAYLOAD, options);

    // Add this answer to other answers
    surveryAnswers.value.forEach(answer => {
      if (answer.id.toString() === selectedAnswer.value.toString()) {
        answer.cnt += 1;
      }
    });
    recalculateAnswers();

    success.value = `Thank you for the vote. The most chosen will be the topic in your next AMA session.`;
  } catch (e: unknown) {
    success.value = '';
    if (e instanceof AxiosError && e.response?.data?.code === 422081) {
      errors.value = e.response.data.message.replaceAll('_', ' ');
    } else {
      errors.value = 'Something went wrong, please try again later.';
    }
    console.error(e);
  }

  loading.value = false;
}

const answerInPercent = (numOfAnswers: number) => {
  return Math.round((100 * numOfAnswers) / allAnswers.value);
};

function recalculateAnswers() {
  // Sum all answers
  surveryAnswers.value.forEach(answer => {
    allAnswers.value += answer.cnt;
  });
  // Calculate percentage
  surveryAnswers.value.forEach(answer => {
    answer.percent = answerInPercent(answer.cnt);
  });
}
</script>

<style lang="postcss" module></style>

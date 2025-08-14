<template>
  <vue-cookie-accept-decline
    :debug="true"
    class="stroke-gradient rounded-[4px] bg-white bg-opacity-20"
    ref="cookieConsent"
    element-id="cookieConsent"
    :type="'floating'"
    :disable-decline="false"
    transition-name="slideIn"
    :show-postpone-button="false"
    @status="cookieStatus"
    @clicked-accept="cookieClickedAccept"
    @clicked-decline="cookieClickedDecline"
  >
    <!-- Optional -->
    <template #postponeContent>&times;</template>

    <!-- Optional -->
    <template #message class="text-white-off text-xs">
      This website uses cookies to ensure you get the best experience on our website.
    </template>

    <!-- Optional -->
    <template #declineContent class="text-white-off text-sm">
      <strong class="body-sm tracking-[4px]">Decline</strong>
    </template>

    <!-- Optional -->
    <template #acceptContent>
      <Btn class="mr-[15px]" min-width="130px" width="130px" min-height="50px" :tracking="false">
        Accept
      </Btn>
    </template>
  </vue-cookie-accept-decline>
</template>

<script lang="ts" setup>
import vueCookieAcceptDecline from 'vue-cookie-accept-decline';
import { useState, isTracking } from 'vue-gtag-next';

const status = ref('');
const cookieConsent = ref(null);
const { isEnabled } = useState();

const cookieStatus = computed(() => {
  if (isEnabled !== undefined) {
    isEnabled.value = status.value === 'accept';
  }
  return status.value;
});

onMounted(() => {
  if (process.client && localStorage.getItem('vue-cookie-accept-decline-cookieConsent')) {
    status.value =
      localStorage.getItem('vue-cookie-accept-decline-cookieConsent') === 'accept'
        ? 'accept'
        : 'decline';
  }
});

function cookieClickedAccept() {
  status.value = 'accept';
  localStorage.setItem('vue-cookie-accept-decline-cookieConsent', status.value);
}

function cookieClickedDecline() {
  status.value = 'decline';
  localStorage.setItem('vue-cookie-accept-decline-cookieConsent', status.value);
}
</script>

<style lang="postcss">
.cookie {
  backface-visibility: hidden;
  position: fixed;
  z-index: 2;
  bottom: 16px;
  right: 16px;
  width: 100%;
  max-width: 345px;

  @screen lg {
    bottom: 50px;
    right: 20px;
  }

  &__floating__wrap {
    position: relative;
    display: flex;
    padding: 24px;
    flex-direction: column;
    justify-content: space-between;
  }

  &__floating__content {
    font-size: 14px;
    align-self: center;
    margin-bottom: 20px;
  }

  &__floating__buttons {
    display: flex;
    justify-content: center;
  }

  &__floating__buttons__button--decline {
    background: none;
    cursor: pointer;
    border: none;
    padding: 10px 11px 12px;
    font-size: 14px;
    margin: 0 15px;
  }
}

.slideIn-enter,
.slideIn-leave-to {
  transform: translate(120%, 0px);
}
.slideIn-enter-to,
.slideIn-leave {
  transform: translate(0px, 0px);
}
.slideIn-enter-active {
  transition: transform 600ms cubic-bezier(0.175, 0.885, 0.325, 1.175);
  transition-delay: 1500ms;
}
.slideIn-leave-active {
  transition: transform 600ms cubic-bezier(0.77, -0.095, 0.735, 0.045);
}
</style>

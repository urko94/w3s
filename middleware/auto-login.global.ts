import { useAuthStore } from '~/store/auth';
/**
 * Load user data from localStorage into pinia.
 * If no user data in localStorage, logout.
 * Also logout if provider wallet is set and does not match localStorage wallet
 */
export default defineNuxtRouteMiddleware(async to => {
  if (process.client) {
    const authStore = useAuthStore();
    if (authStore.jwt) {
      // Store already init'ed
      return;
    }

    const auth = authStore.loadAuthFromLS();
    const providerWallet = authStore.providerWallet;
    const lowerProviderWallet =
      typeof providerWallet !== 'string' ? '' : providerWallet.toLowerCase();
    const lowerAuth =
      !auth || !auth.user || typeof auth.user.wallet !== 'string'
        ? ''
        : auth.user.wallet.toLowerCase();

    if (
      !auth ||
      !auth.jwt ||
      !auth.user ||
      !auth.user.wallet ||
      auth.error ||
      (!!providerWallet && lowerProviderWallet !== lowerAuth)
    ) {
      authStore.logout();
    } else {
      authStore.refreshUser();
    }
  }
});

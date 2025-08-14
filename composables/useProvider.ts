import detectEthereumProvider from '@metamask/detect-provider';
import { providers } from 'ethers';
import { ethers } from 'ethers';
import { ActionReturn } from '~/utils/builders';
import chains from '~/config/chains';
import { removeLastSlash } from '~/utils/strings';
import { useAuthStore } from '~~/store/auth';

// Shared state
const ethereum = ref<providers.ExternalProvider>();
const provider = ref<providers.Web3Provider>();
const userAccount = ref('');
const chainId = ref('');

export default function useProvider() {
  const authStore = useAuthStore();

  onMounted(() => {
    initProvider();
  });

  async function initProvider() {
    if (provider.value) {
      return ActionReturn(true, provider.value);
    }

    const detected: any = await detectEthereumProvider();

    // Prevent further initialization process if eth is already init in another instance
    if (ethereum.value) {
      return ActionReturn(true, provider.value);
    } else if (
      detected &&
      !detected.selectedProvider &&
      Array.isArray(detected.providers) &&
      detected.providers.length
    ) {
      // Prefer metamask if multiple providers
      let selectedProvider = detected.providers[0];
      for (const p of detected.providers) {
        if (p.isMetaMask) {
          selectedProvider = p;
          break;
        }
      }
      ethereum.value = selectedProvider;
    } else {
      ethereum.value = detected;
    }

    if (ethereum.value) {
      // Everything ok
      provider.value = new ethers.providers.Web3Provider(ethereum.value, 'any');
      // $store.dispatch(TxAction.checkAllTransactions, provider.value);
      return ActionReturn(true, provider.value);
    } else {
      // Failed to detect window.ethereum
      return ActionReturn(false, 'Failed to establish wallet connection');
    }
  }

  function setUserAccount(value: string) {
    userAccount.value = value;

    const lowerValue = !value || typeof value !== 'string' ? '' : value.toLowerCase();
    authStore.providerWallet = lowerValue;

    const authAddress = authStore.walletAddress;
    const lowerStore = typeof authAddress !== 'string' ? '' : authAddress.toLowerCase();

    // If auth user is of wrong wallet, log HIM OUT! >:(
    if (authStore.jwt && lowerStore !== lowerValue) {
      authStore.logout();
    }
  }

  function setChainId(value: string) {
    chainId.value = value;
  }

  return {
    ethereum: computed(() => ethereum.value as providers.ExternalProvider),
    provider: computed(() => provider.value),
    userAccount: computed(() => userAccount.value),
    chainId: computed(() => chainId.value),

    explorerUrl: computed(() => {
      if (chainId.value && chains[chainId.value]?.blockExplorerUrls.length) {
        return removeLastSlash(`${chains[chainId.value]?.blockExplorerUrls[0]}`);
      }
      return '';
    }),

    initProvider,
    setUserAccount,
    setChainId,
  };
}

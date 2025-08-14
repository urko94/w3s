import useProvider from '~/composables/useProvider';
import chains from '~/config/chains';

const isMetamaskLoading = ref(true); // disable interaction while setting metamask account/chain
const isMetamaskInitialized = ref(false); // is window.ethereum initialized
const isMetamaskConnected = ref(false); // is metamask account connected
const isMetamaskChainConnected = ref(false); // is metamask chain connected

export default function useWalletAccounts() {
  // const $store = useStore();
  const config = useRuntimeConfig();

  const metamaskStatus = ref('Waiting for wallet...');

  const { ethereum, provider, userAccount, initProvider, setUserAccount, setChainId } =
    useProvider();

  const isMetamaskReady = computed(() => {
    return (
      !isMetamaskLoading.value &&
      isMetamaskInitialized.value &&
      isMetamaskConnected.value &&
      isMetamaskChainConnected.value
    );
  });

  onMounted(async () => {
    const { success, data } = await initProvider();

    if (!success) {
      metamaskStatus.value = data;
    } else {
      isMetamaskInitialized.value = true;

      registerEventHandlers();
      await checkForConnectedAccount();
      await checkChain();
    }

    isMetamaskLoading.value = false;
  });

  onUnmounted(() => {
    removeEventHandlers();
  });

  function registerEventHandlers() {
    if (ethereum.value) {
      ethereum.value.on('accountsChanged', handleAccountsChanged);
      ethereum.value.on('chainChanged', handleChainChanged);
    }
  }

  function removeEventHandlers() {
    if (ethereum.value) {
      ethereum.value.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.value.removeListener('chainChanged', handleChainChanged);
    }
  }

  async function checkForConnectedAccount() {
    if (!isMetamaskInitialized.value) {
      console.error('Wallet not initialized');
      return;
    }

    if (!ethereum.value) {
      console.error('Ethereum not initialized');
      return;
    }

    try {
      await handleAccountsChanged();
    } catch (err) {
      console.error(err);
      // showError();
    }
  }

  async function checkChain() {
    if (!ethereum.value) {
      console.error('Ethereum not initialized');
      return;
    }
    const chainId = await ethereum.value.request({ method: 'eth_chainId' });
    handleChainChanged(chainId);
  }

  async function handleAccountsChanged() {
    // Get accounts from ethers, which respects capitalization
    const accounts: Array<string> = (await provider.value?.listAccounts()) || [];

    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setUserAccount('');
      isMetamaskConnected.value = false;
      metamaskStatus.value = 'Please connect to a wallet';
    } else if (accounts[0] !== userAccount.value) {
      setUserAccount(accounts[0]);
      isMetamaskConnected.value = true;
    } else if (userAccount.value) {
      // account is connected and unchanged
      isMetamaskConnected.value = true;
    }
  }

  function handleChainChanged(chainId: string) {
    setChainId(chainId);

    if (chainId === config.CHAIN_ID) {
      isMetamaskChainConnected.value = true;
      // watch `isMetamaskChainConnected` to reload component
    } else {
      isMetamaskChainConnected.value = false;
      metamaskStatus.value = 'Select the supported chain';
    }
  }

  /**
   * Trigger wallet modal if NO account already set
   */
  async function connectToAccount(resetPermissions: boolean = false) {
    if (!isMetamaskInitialized.value) {
      console.error('Wallet not initialized');
      return;
    }

    if (!ethereum.value) {
      console.error('Ethereum not initialized');
      return;
    }

    try {
      isMetamaskLoading.value = true;

      if (resetPermissions) {
        await ethereum.value.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
      }

      await ethereum.value.request({
        method: 'eth_requestAccounts',
      });
      await handleAccountsChanged();
    } catch (err) {
      if (err.code === 4001) {
        /**
         * EIP-1193 userRejectedRequest error
         * If this happens, the user rejected the connection request.
         */
        metamaskStatus.value = 'Please connect to a wallet';
        // showError('You have to connect to a wallet to use this functionality');
      } else {
        console.error(err);
        // showError();
      }
    }

    isMetamaskLoading.value = false;
  }

  /**
   * Open MetaMask request to change to a specific chain
   * If chain is not added to metamask yet, open request to add it
   */
  async function connectToChain(chainId = config.CHAIN_ID) {
    if (!isMetamaskInitialized.value) {
      console.error('Wallet not initialized');
      return;
    }

    if (!ethereum.value) {
      console.error('Ethereum not initialized');
      return;
    }

    try {
      isMetamaskLoading.value = true;

      await ethereum.value.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });

      handleChainChanged(chainId);
    } catch (err) {
      if (err.code === 4001) {
        showError('Please connect to specified chain to use this functionality');
      } else if (!!chains[chainId] && err.code === 4902) {
        // Chain not added to MetaMask yet
        try {
          await ethereum.value.request({
            method: 'wallet_addEthereumChain',
            params: [chains[chainId]],
          });
        } catch (err) {
          if (err.code === 4001) {
            // User declined
            showError('Please add the specified chain to use this functionality');
          }
          // showError();
        }
      } else {
        console.error(err);
        // showError();
      }
    }

    isMetamaskLoading.value = false;
  }

  // function showError(msg) {
  //   $store.dispatch('modal/show', {
  //     title: 'Wallet error',
  //     description: msg || 'Check for any pending wallet requests and try again',
  //     action: 'Go Back',
  //   });
  // }

  return {
    metamaskStatus,
    isMetamaskLoading: computed(() => isMetamaskLoading.value),
    isMetamaskInitialized: computed(() => isMetamaskInitialized.value),
    isMetamaskConnected: computed(() => isMetamaskConnected.value),
    isMetamaskChainConnected: computed(() => isMetamaskChainConnected.value),
    isMetamaskReady,
    connectToAccount,
    connectToChain,
  };
}

import { ethers } from 'ethers';
import useProvider from '~/composables/useProvider';
import Contracts, { ContractType, getContractAddressForEnv } from '~/config/contracts';

interface ContractsInterface {
  [contractType: string]: ethers.Contract;
}

interface TokensInterface {
  [contractType: string]: number;
}

/**
 * Shared state
 * Be Careful, it is reactive !!1
 * -1 = unlimited
 */
const contracts = reactive<ContractsInterface>({});
const availableTokens = reactive<TokensInterface>({});

export default function useContracts() {
  const config = useRuntimeConfig();
  const { provider } = useProvider();

  // const $store = useStore()
  const $store = null;

  /**
   * Initialize shared state
   */
  if (Contracts && !!Object.keys(Contracts).length) {
    for (const contractType in Contracts) {
      if (!(contractType in availableTokens)) {
        availableTokens[contractType] = -1;
      }

      if (!(contractType in contracts)) {
        // contracts[contractType] = null;
      }
    }
  }

  async function getMessageSignature(message: string) {
    if (!provider.value) {
      return '';
    }

    try {
      const signedMessage = await provider.value.getSigner().signMessage(message);
      return signedMessage;
    } catch (e) {
      console.error(e);
    }

    return '';
  }

  /**
   * Get date interval for when drop is available
   *
   * @param {ContractType} contract Contract to check dropStart on
   * @param {number} days Number of days from dropStart that drop stays open. 0 = unlimited
   * @param {boolean} whitelist Check for whitelist dropStart, not public dropStart.
   * @returns {null} error
   * @returns {[Date, Date]} Date range [from, to]
   */
  async function getDateInterval(contractType: string, days = 0, whitelist = false) {
    if (!provider.value || !contractType || !(contractType in Contracts)) {
      console.error('Provider or contract not available');
      return null;
    }

    await initContracts([contractType]);

    if (!areContractsAvailable([contractType])) {
      console.error('Contract not available');
      return null;
    }

    try {
      let startTs = new Date().getTime() / 1000;

      // Get either whitelist or public drop start TS
      if (whitelist) {
        startTs = (await contracts[contractType].WLdropStart()).toNumber();
      } else {
        startTs = (await contracts[contractType].dropStart()).toNumber();
      }

      // + 60s buffer
      startTs = startTs + 60;

      const from = new Date(startTs * 1000);
      let to = null;
      if (days > 0) {
        to = new Date(from.getTime());
        to.setDate(to.getDate() + days);
      }
      return [from, to];
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * Check if any tokens are available to be minted on contract
   * Populate shared state availableTokens[contract] with number of remaining available tokens
   *
   * @param {ContractType} contractType Contract to check totalSupply on
   * @returns {boolean} Is supply available
   */
  async function hasSupply(contractType: string) {
    if (!provider.value || !contractType || !(contractType in Contracts)) {
      console.error('Provider or contract not available');
      return false;
    }

    await initContracts([contractType]);

    if (!areContractsAvailable([contractType])) {
      console.error('Contract not available');
      return false;
    }

    try {
      const maxSupply = (await contracts[contractType].maxId()).toNumber();
      const nextId = (await contracts[contractType].nextId()).toNumber();
      const reservedSupply = await contracts[contractType].reserve();

      // Update state (used to limit max mints in a single tx)
      availableTokens[contractType] = Math.max(maxSupply - nextId - reservedSupply + 1, 0);

      // has supply?
      return nextId <= maxSupply - reservedSupply;
    } catch (e) {
      console.error(e);
      console.dir(e);
      return false;
    }
  }

  /**
   * Check if an address is whitelisted to operate on a contract
   *
   * @param {ContractType} contract
   * @param {string} address
   * @returns {boolean} Is whitelisted?
   */
  async function isAddressWhitelisted(contract: string, address: string) {
    if (!provider.value || !contract || !(contract in Contracts)) {
      console.error('Provider or contract not available');
      return false;
    }

    if (!address || !(typeof address === 'string')) {
      console.error('Invalid params');
      return false;
    }

    await initContracts([contract]);

    if (!areContractsAvailable([contract])) {
      console.error('Contract not available');
      return false;
    }

    try {
      const isWhitelisted = await contracts[contract].whitelisted(address);
      return !!isWhitelisted;
    } catch (e) {
      console.error(e);
      console.dir(e);
      return false;
    }
  }

  /**
   * Initialize contracts if not yet initialized or selected chain changed
   * @param {Array<ContractType>} types
   * @param {string[]} overrideAddresses
   */
  async function initContracts(types: Array<string>, overrideAddresses: Array<string> = []) {
    if (Array.isArray(types) && provider.value) {
      const { chainId } = await provider.value.getNetwork();

      await Promise.all(
        types.map(async (x, i) => {
          if (!x || !(x in contracts)) {
            return;
          }

          if (!contracts[x]) {
            initContract(x, overrideAddresses[i] ?? '');
          } else if (contracts[x].provider) {
            // Check if chain changed
            const { chainId: contractChainId } = await contracts[x].provider.getNetwork();
            if (contractChainId !== chainId) {
              initContract(x, overrideAddresses[i] ?? '');
            }
          }
        })
      );
    } else if (!provider.value) {
      console.error('Provider or contract not available');
    } else {
      console.error('array expected');
    }
  }

  /**
   * Helper for initializing specific contract
   * @param {ContractType} contractType
   * @param {string} overrideAddress Override address
   */
  function initContract(contractType: string, overrideAddress: string = '') {
    if (Contracts) {
      if (contractType in Contracts) {
        contracts[contractType] = new ethers.Contract(
          overrideAddress || getContractAddressForEnv(contractType, config.ENV),
          Contracts[contractType].abi,
          provider.value
        );
      }
    }
  }

  function areContractsAvailable(types: Array<string>) {
    if (Array.isArray(types)) {
      return !types.some(x => {
        if (!x) {
          return false;
        }

        if (!(x in contracts) || !contracts[x] || !contracts[x].provider) {
          return true;
        }

        return false;
      });
    } else {
      console.error('array expected');
    }

    return false;
  }

  function contractError(e: any) {
    console.error(e);
    console.dir(e);

    // ignore user declined
    if (e?.code !== 4001) {
      // $store.commit('modal/RESET_CONTENT');

      if (e?.error?.message?.includes('insufficient funds')) {
        // Insufficient funds
        // $store.dispatch('modal/show', {
        //   title: 'Insufficient funds',
        //   description: '',
        //   action: 'Go Back',
        // });
      } else if (e?.error?.message?.includes('Purchase would exceed max supply')) {
        // Max supply exceeded
        // $store.dispatch('modal/show', {
        //   title: 'Not enough NFTs',
        //   description: 'You have requested too many or there is no more supply.',
        //   action: 'Go Back',
        // });
      } else if (e?.error?.message?.includes('Wallet already used')) {
        // Wallet already used
        // $store.dispatch('modal/show', {
        //   title: 'Wallet already used',
        //   description: 'This NFT has a limit of mints per wallet.',
        //   action: 'Go Back',
        // });
      } else if (e?.error?.message?.includes('Only WL addresses allowed.')) {
        // Wallet not whitelisted
        // $store.dispatch('modal/show', {
        //   title: 'Wallet Not On Whitelist',
        //   description: 'Only whitelisted wallet addresses are currently permitted.',
        //   action: 'Go Back',
        // });
      } else if (e?.error?.message?.includes('transfer caller is not owner nor approved')) {
        // Wallet not approved to use functionality
        // $store.dispatch('modal/show', {
        //   title: 'Wallet Not Approved',
        //   description: 'Wallet has not been approved to use this functionality.',
        //   action: 'Go Back',
        // });
      } else if (
        e?.error?.message?.includes('transfer of token that is not own') ||
        e?.error?.message?.includes('Invalid tokenId')
      ) {
        // Stake went through already, owner is now Gateway contract
        // $store.dispatch('modal/show', {
        //   title: 'Transfer In Progress',
        //   description: 'Please wait for transfer to finish processing.',
        //   action: 'Go Back',
        // });
      } else {
        // $store.dispatch('modal/show', {
        //   title: 'Blockchain communication error',
        //   // description: e?.error?.message?.split(':').pop().trim() || '',
        //   description: '',
        //   action: 'Go Back',
        // });
      }
    }
  }

  return {
    contracts,
    availableTokens,

    getMessageSignature,
    getDateInterval,
    hasSupply,
    isAddressWhitelisted,
    initContracts,
    areContractsAvailable,
    contractError,
  };
}

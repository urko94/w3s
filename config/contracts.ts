import { nftAbi } from '~/config/abi';

interface ContractTypesInterface {
  [contractType: string]: string;
}
interface ContractInterface {
  abi: Array<any>;
  address: string;
  stgAddress: string;
  devAddress: string;
  additionalGas: string;
}
interface ContractsInterface {
  [contractType: string]: ContractInterface;
}

export const ContractType: ContractTypesInterface = {
  W3S: 'web3spaces',
};

/**
 * @param {Array<any>} abi ABI for contract
 * @param {string} address Production contract address
 * @param {string} stgAddress Staging contract address
 * @param {string} devAddress Development contract address
 * @param {string} additionalGas Gas to add to contract estimate (safety buffer)
 */
function ContractsTemplate(
  abi: Array<any>,
  address: string,
  stgAddress: string = '',
  devAddress: string = '',
  additionalGas: string = ''
): ContractInterface {
  return {
    abi,
    address,
    stgAddress,
    devAddress,
    additionalGas,
  };
}

const Contracts: ContractsInterface = {
  [ContractType.W3S]: ContractsTemplate(
    nftAbi,
    '0xef9c21e3ba31a74910fc7e7cb3fc814ad842ad6e', // prod
    '0xD593d92d302ef28A5333592f0a576862C2FDB25B', // stg
    '0xCbF8C7684941BD3Cbc013Ff643cefBbff6181b8F' // dev
  ),
};

export function getContractAddressForEnv(
  type: string = ContractType.W3S,
  env: string = 'production'
) {
  if (!(type in Contracts)) {
    return '';
  }

  if (env === 'development' && Contracts[type].devAddress) {
    return Contracts[type].devAddress;
  }

  if (Contracts[type].stgAddress && (env === 'development' || env === 'staging')) {
    return Contracts[type].stgAddress;
  }

  return Contracts[type].address;
}

export default Contracts;

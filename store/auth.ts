import axios, { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { NftMetadataInterface, NftsResponseInterface } from '~~/lib/Interface';
import { StoreErrorMessage } from '~~/utils/builders';

export const AuthLsKeys = {
  AUTH: 'ta_auth',
};

export const UserStatus = {
  INCOMPLETE: 1,
  UNVERIFIED: 2,
  ACTIVE: 5,
  DEACTIVATED: 9,
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: '', // localStorage.getItem('jwt')
    providerWallet: '', // wallet selected in wallet provider
    message: '',
    user: {
      id: 0,
      status: 0,
      email: '',
      firstname: '',
      lastname: '',
      company: '',
      position: '',
      linkedin: '',
      email_notifications: '',
      wallet: '',
      signature: '',
      uuid: '',
    },
    tokens: Array<NftMetadataInterface>(),
    tokenId: 1,
    tokenType: '',
    tokenRequest: {
      id: 0,
      isActive: false,
      redeem_mail_sent: '',
      status: 0,
      token_type_id: 0,
      user_id: 0,
      uuid: '',
    },
  }),
  getters: {
    loggedIn: state => !!state.user.wallet && !!state.jwt,
    walletAddress: state => state.user.wallet,
    allowedEntry: state =>
      !!state.user.wallet &&
      (state.user.status === UserStatus.ACTIVE || state.user.status === UserStatus.UNVERIFIED),
    axiosHeaders: state => {
      return {
        Authorization: `Bearer ${state.jwt}`,
        'Content-Type': 'application/json',
      };
    },
  },
  actions: {
    updateUser(payload: any) {
      this.$state.user = Object.assign(this.$state.user, payload);
    },

    updateTokenRequest(payload: any) {
      this.$state.tokenRequest = Object.assign(this.$state.tokenRequest, payload);
    },

    setWalletAddress(wallet: string) {
      this.$state.user.wallet = wallet;
    },

    setSignature(signature: string) {
      this.$state.user.signature = signature;
    },

    setTokens(tokens: Array<NftMetadataInterface>) {
      this.$state.tokens = tokens;

      let tokenType = '';
      let tokenId = 1;
      tokens.forEach((token: NftMetadataInterface) => {
        const attributeRarity = token.attributes.filter(_ => _.trait_type === 'Rarity');
        if (attributeRarity && attributeRarity[0]?.value) {
          const type = attributeRarity[0]?.value;
          if (type === 'vip' || tokenType === '') {
            tokenType = type;
            tokenId = token.number;
          }
        }
      });
      this.$state.tokenType = tokenType;
      this.$state.tokenId = tokenId;
    },

    saveUser(payload: any) {
      if (!payload.user) {
        console.error('auth', 'saveUser', 'missing payload data');
        return;
      }
      this.updateUser(payload.user);

      if (payload.jwt) {
        this.$state.jwt = payload.jwt;
      }

      if (process.client) {
        localStorage.setItem(
          AuthLsKeys.AUTH,
          JSON.stringify({
            jwt: payload.jwt || this.$state.jwt,
            user: payload.user,
          })
        );
      }
    },

    /**
     * Try to load user info from localStorage, if user is not set in state yet
     */
    loadAuthFromLS() {
      if (!process.client) {
        return;
      }

      if (this.$state.jwt && this.$state.user.wallet) {
        return { jwt: this.$state.jwt, user: this.$state.user };
      }

      try {
        const strAuth = localStorage.getItem(AuthLsKeys.AUTH);
        if (strAuth) {
          const auth = JSON.parse(strAuth);
          if (auth) {
            this.$state.jwt = auth.jwt;
            this.updateUser(auth.user);
            return auth;
          }
        }
      } catch (error) {
        console.error('auth', 'loadAuthFromLS', JSON.stringify(error));
        return { error };
      }
    },

    logout() {
      this.$state.jwt = '';
      this.updateUser({
        id: 0,
        status: 0,
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        position: '',
        linkedin: '',
        wallet: '',
      });
      localStorage.removeItem(AuthLsKeys.AUTH);
    },

    async refreshUser() {
      if (!this.$state.user.wallet || !this.$state.jwt) {
        return null;
      }
      const config = useRuntimeConfig();
      const options = {
        headers: this.axiosHeaders,
        params: { user: this.$state.user },
      };
      try {
        const { data } = await axios.get(`${config.API_BASE}/users/profile`, options);

        this.saveUser({ user: data });
        this.getTokens();

        return data;
      } catch (e) {
        console.error(StoreErrorMessage('auth', 'refreshUser', JSON.stringify(e)));
      }
      return null;
    },

    async getTokens() {
      const config = useRuntimeConfig();
      const NFT_URL = `${config.API_BASE}/nfts`;
      const options = {
        headers: this.axiosHeaders,
        params: {},
      };

      try {
        const nftsResponse: AxiosResponse = await axios.get(NFT_URL, options);
        const data: NftsResponseInterface = nftsResponse.data;

        if (data?.total > 0 && data.items) {
          const tokensPromises = data.items.map(async nftState => {
            return this.getTokenInfo(nftState.type, nftState.number);
          });
          Promise.all(tokensPromises)
            .then(tokens => {
              this.setTokens(tokens as Array<NftMetadataInterface>);
            })
            .catch(e => {
              console.error(e);
            });
        }
      } catch (e: unknown) {
        console.error(e);
      }
    },

    async getTokenInfo(type: number, id: number) {
      const config = useRuntimeConfig();
      const URL = `${config.API_BASE}/nfts/${type}/${id}`;

      try {
        const responseNftMetadata: AxiosResponse = await axios.get(URL);
        const data: NftMetadataInterface = responseNftMetadata.data;
        return data;
      } catch (e: unknown) {
        console.error(e);
      }
      return null;
    },
  },
});

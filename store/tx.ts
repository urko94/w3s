import { defineStore } from 'pinia';

interface TransactionInterface {
  [key: string]: any;
}

export const useTxStore = defineStore({
  id: 'tx',
  state: () => {
    return {
      transactions: <TransactionInterface>{},
      pending: <Array<string>>[], // hashes
    };
  },
  getters: {
    transactions: state => state.transactions,
    pending: state => state.pending,

    recentTransactions: state =>
      Object.values(state.transactions).sort(
        (a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0)
      ),
    isPending: state => state.pending && state.pending.length,

    pendingTransactions: state => {
      const pendingTxs: Array<any> = [];
      for (const pending of state.pending) {
        if (pending in state.transactions) {
          pendingTxs.push(state.transactions[pending]);
        }
      }
      return pendingTxs;
    },
  },
  actions: {
    reset() {
      this.transactions = {};
      this.pending = [];
    },

    addTransaction(payload: any) {
      if (payload && payload.hash) {
        const transaction = {
          createdAt: new Date().getTime(),
          done: false,
          hash: payload.hash,
          meta: payload.meta,
        };
        this.setTransaction(transaction);
      }
    },

    setTransaction(payload: any) {
      if (payload && payload.hash) {
        this.transactions = {
          ...this.transactions,
          [payload.hash]: payload,
        };
      }
    },

    removeTransaction(payload: string) {
      if (payload in this.transactions) {
        const transactions = { ...this.transactions };
        delete transactions[payload];
        this.transactions = transactions;
      }
    },

    addPending(payload: any) {
      this.pending.push(payload);
    },

    removePending(payload: any) {
      this.pending = this.pending.filter(x => x !== payload);
    },

    removeDone() {
      // Only keep txs that are not done yet
      const undone: TransactionInterface = {};
      for (const key in this.transactions) {
        if (!this.transactions[key].done) {
          undone[key] = this.transactions[key];
        }
      }
      this.transactions = undone;
    },
  },
});

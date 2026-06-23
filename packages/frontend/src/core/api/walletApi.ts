import { apiClient } from './client';
import { endpoints } from './endpoints';

export interface FundWalletData {
  amount: number;
  reference: string;
}

export const walletApi = {
  createWallet: () => apiClient.post(endpoints.wallets.create),
  getWallet: () => apiClient.get(endpoints.wallets.me),
  getBalance: () => apiClient.get(endpoints.wallets.balance),
  fundWallet: (data: FundWalletData) => apiClient.post(endpoints.wallets.fund, data),
  withdraw: (data: FundWalletData) => apiClient.post(endpoints.wallets.withdraw, data),
};
